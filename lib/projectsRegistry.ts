import { put, list, del } from '@vercel/blob';
import fs from 'fs';
import path from 'path';

export interface CustomProjectRecord {
  id: string;
  category: 'artwork' | 'audio' | 'video';
  title: string;
  artist: string;
  style: string;
  concept?: string;
  description?: string;
  fileUrl: string;
  fileName: string;
  deliverables?: string[];
  format?: string;
  lufs?: string;
  duration?: string;
  createdAt: string;
}

// In-memory cache for serverless invocation reuse
let memoryProjects: CustomProjectRecord[] = [];

const localFilePath = path.join(process.cwd(), 'data', 'uploaded-projects.json');
const isVercel = process.env.VERCEL === '1' || process.env.AWS_LAMBDA_FUNCTION_NAME;

/**
 * Retrieves all custom uploaded project records.
 */
export async function getCustomProjects(): Promise<CustomProjectRecord[]> {
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN || process.env.VERCEL_BLOB_TOKEN;

  // Try Vercel Blob registry first
  if (blobToken) {
    try {
      const response = await list({ prefix: 'data/projects-registry.json', token: blobToken });
      if (response && response.blobs && response.blobs.length > 0) {
        const targetBlob = response.blobs.find((b) => b.pathname === 'data/projects-registry.json') || response.blobs[0];
        const res = await fetch(targetBlob.downloadUrl || targetBlob.url, {
          cache: 'no-store',
        });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            memoryProjects = data;
            return data;
          }
        }
      }
    } catch (e) {
      console.warn('[Registry] Vercel Blob registry fetch error:', e);
    }
  }

  // Try local file during local development
  if (!isVercel && fs.existsSync(localFilePath)) {
    try {
      const raw = fs.readFileSync(localFilePath, 'utf8');
      const data = JSON.parse(raw);
      if (Array.isArray(data)) {
        memoryProjects = data;
        return data;
      }
    } catch (e) {
      console.warn('Error reading local uploaded-projects.json:', e);
    }
  }

  return memoryProjects;
}

/**
 * Saves a new custom project record into the permanent registry.
 */
export async function saveCustomProject(project: CustomProjectRecord): Promise<CustomProjectRecord[]> {
  const existing = await getCustomProjects();
  // Filter out any duplicate ID
  const updated = [project, ...existing.filter((p) => p.id !== project.id)];
  memoryProjects = updated;

  const blobToken = process.env.BLOB_READ_WRITE_TOKEN || process.env.VERCEL_BLOB_TOKEN;

  // 1. Save to Vercel Blob if available
  if (blobToken) {
    try {
      await put('data/projects-registry.json', JSON.stringify(updated, null, 2), {
        access: 'public',
        addRandomSuffix: false,
        token: blobToken,
        contentType: 'application/json',
      });
      console.log('[Registry] Saved updated projects list to Vercel Blob storage');
    } catch (e) {
      console.error('[Registry] Error writing to Vercel Blob registry:', e);
    }
  }

  // 2. Save locally during local development
  if (!isVercel) {
    try {
      const dataDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
      fs.writeFileSync(localFilePath, JSON.stringify(updated, null, 2), 'utf8');
      console.log('[Registry] Saved custom project locally to data/uploaded-projects.json');
    } catch (e) {
      console.warn('[Registry] Error writing to local uploaded-projects.json:', e);
    }
  }

  return updated;
}

/**
 * Deletes a custom project by ID from the registry.
 */
export async function deleteCustomProject(id: string): Promise<CustomProjectRecord[]> {
  const existing = await getCustomProjects();
  const toDelete = existing.find((p) => p.id === id);
  const updated = existing.filter((p) => p.id !== id);
  memoryProjects = updated;

  const blobToken = process.env.BLOB_READ_WRITE_TOKEN || process.env.VERCEL_BLOB_TOKEN;

  if (blobToken) {
    try {
      if (toDelete && toDelete.fileUrl && toDelete.fileUrl.includes('blob.vercel-storage.com')) {
        await del(toDelete.fileUrl, { token: blobToken });
      }
    } catch {}

    try {
      await put('data/projects-registry.json', JSON.stringify(updated, null, 2), {
        access: 'public',
        addRandomSuffix: false,
        token: blobToken,
        contentType: 'application/json',
      });
    } catch (e) {
      console.error('[Registry] Error updating Vercel Blob registry:', e);
    }
  }

  if (!isVercel) {
    try {
      fs.writeFileSync(localFilePath, JSON.stringify(updated, null, 2), 'utf8');
    } catch (e) {
      console.warn('[Registry] Error updating local file:', e);
    }
  }

  return updated;
}
