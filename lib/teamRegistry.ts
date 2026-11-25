import { put, list, del } from '@vercel/blob';
import fs from 'fs';
import path from 'path';
import os from 'os';
import type { TeamMember } from '@/data/team';

// In-memory cache for serverless execution reuse
let memoryTeam: TeamMember[] = [];

const localFilePath = path.join(process.cwd(), 'data', 'uploaded-team.json');
const tmpFilePath = path.join(os.tmpdir(), 'uploaded-team.json');
const isVercel = process.env.VERCEL === '1' || process.env.AWS_LAMBDA_FUNCTION_NAME;

/**
 * Retrieves all custom added team members from the permanent cloud registry.
 */
export async function getCustomTeamMembers(): Promise<TeamMember[]> {
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN || process.env.VERCEL_BLOB_TOKEN;

  // 1. Try Vercel Blob registry first
  if (blobToken) {
    try {
      const response = await list({ prefix: 'data/team-registry.json', token: blobToken });
      if (response && response.blobs && response.blobs.length > 0) {
        const targetBlob = response.blobs.find((b) => b.pathname === 'data/team-registry.json') || response.blobs[0];
        const res = await fetch(targetBlob.downloadUrl || targetBlob.url, {
          cache: 'no-store',
        });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            memoryTeam = data;
            return data;
          }
        }
      }
    } catch (e) {
      console.warn('[TeamRegistry] Vercel Blob registry fetch error:', e);
    }
  }

  // 2. Try local file during local development
  if (fs.existsSync(localFilePath)) {
    try {
      const raw = fs.readFileSync(localFilePath, 'utf8');
      const data = JSON.parse(raw);
      if (Array.isArray(data)) {
        memoryTeam = data;
        return data;
      }
    } catch (e) {
      console.warn('[TeamRegistry] Error reading local uploaded-team.json:', e);
    }
  }

  // 3. Try tmp file in serverless
  if (fs.existsSync(tmpFilePath)) {
    try {
      const raw = fs.readFileSync(tmpFilePath, 'utf8');
      const data = JSON.parse(raw);
      if (Array.isArray(data)) {
        memoryTeam = data;
        return data;
      }
    } catch {}
  }

  return memoryTeam;
}

/**
 * Saves a new custom team member into the permanent registry.
 */
export async function saveCustomTeamMember(member: TeamMember): Promise<TeamMember[]> {
  const existing = await getCustomTeamMembers();
  // Filter out any duplicate ID, append new member
  const updated = [member, ...existing.filter((m) => m.id !== member.id)];
  memoryTeam = updated;

  const blobToken = process.env.BLOB_READ_WRITE_TOKEN || process.env.VERCEL_BLOB_TOKEN;

  // 1. Save to Vercel Blob if token is present
  if (blobToken) {
    try {
      await put('data/team-registry.json', JSON.stringify(updated, null, 2), {
        access: 'public',
        addRandomSuffix: false,
        token: blobToken,
        contentType: 'application/json',
      });
      console.log('[TeamRegistry] Saved updated team list to Vercel Blob storage');
    } catch (e) {
      console.error('[TeamRegistry] Error writing to Vercel Blob registry:', e);
    }
  }

  // 2. Save locally during local development
  try {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(localFilePath, JSON.stringify(updated, null, 2), 'utf8');
    console.log('[TeamRegistry] Saved custom team member locally to data/uploaded-team.json');
  } catch {}

  // 3. Always write to serverless tmp directory
  try {
    fs.writeFileSync(tmpFilePath, JSON.stringify(updated, null, 2), 'utf8');
  } catch {}

  return updated;
}

/**
 * Deletes a custom team member by ID from the registry.
 */
export async function deleteCustomTeamMember(id: string): Promise<TeamMember[]> {
  const existing = await getCustomTeamMembers();
  const toDelete = existing.find((m) => m.id === id);
  const updated = existing.filter((m) => m.id !== id);
  memoryTeam = updated;

  const blobToken = process.env.BLOB_READ_WRITE_TOKEN || process.env.VERCEL_BLOB_TOKEN;

  if (blobToken) {
    try {
      if (toDelete && toDelete.image && toDelete.image.includes('blob.vercel-storage.com')) {
        await del(toDelete.image, { token: blobToken });
      }
    } catch {}

    try {
      await put('data/team-registry.json', JSON.stringify(updated, null, 2), {
        access: 'public',
        addRandomSuffix: false,
        token: blobToken,
        contentType: 'application/json',
      });
    } catch (e) {
      console.error('[TeamRegistry] Error updating Vercel Blob team registry:', e);
    }
  }

  try {
    fs.writeFileSync(localFilePath, JSON.stringify(updated, null, 2), 'utf8');
  } catch {}

  try {
    fs.writeFileSync(tmpFilePath, JSON.stringify(updated, null, 2), 'utf8');
  } catch {}

  return updated;
}
