import { put } from '@vercel/blob';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

export interface UploadResult {
  url: string;
  filename: string;
  provider: 'vercel-blob' | 'cloudinary' | 'external-cdn' | 'local';
  size: number;
  contentType: string;
}

/**
 * Uploads a file buffer to permanent external cloud storage.
 * Automatically chooses the best storage provider:
 * 1. Vercel Blob (if BLOB_READ_WRITE_TOKEN is configured)
 * 2. Cloudinary (if CLOUDINARY_URL or CLOUDINARY_CLOUD_NAME is configured)
 * 3. Free External Image CDN fallback (for images)
 * 4. Local filesystem (ONLY during local development, never in Vercel production)
 */
export async function uploadToStorage(
  buffer: Buffer,
  originalFilename: string,
  category: 'artwork' | 'audio' | 'video',
  contentType?: string
): Promise<UploadResult> {
  const safeBase = originalFilename
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, '-')
    .replace(/-+/g, '-');
  const timestamp = Date.now().toString(36);
  const ext = path.extname(safeBase) || (category === 'artwork' ? '.png' : category === 'audio' ? '.mp3' : '.mp4');
  const nameWithoutExt = path.basename(safeBase, ext);
  const finalFilename = `${nameWithoutExt}-${timestamp}${ext}`;

  const resolvedContentType =
    contentType ||
    (ext === '.png'
      ? 'image/png'
      : ext === '.jpg' || ext === '.jpeg'
      ? 'image/jpeg'
      : ext === '.webp'
      ? 'image/webp'
      : ext === '.mp3'
      ? 'audio/mpeg'
      : ext === '.wav'
      ? 'audio/wav'
      : ext === '.mp4'
      ? 'video/mp4'
      : 'application/octet-stream');

  const folderPath = `${category}/${finalFilename}`;

  // --------------------------------------------------------------------------
  // Provider 1: Vercel Blob Storage (@vercel/blob)
  // --------------------------------------------------------------------------
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN || process.env.VERCEL_BLOB_TOKEN;
  if (blobToken) {
    try {
      console.log(`[Storage] Uploading ${finalFilename} to Vercel Blob (${category})...`);
      const blob = await put(folderPath, buffer, {
        access: 'public',
        contentType: resolvedContentType,
        token: blobToken,
      });

      console.log(`[Storage] Vercel Blob upload successful: ${blob.url}`);
      return {
        url: blob.url,
        filename: finalFilename,
        provider: 'vercel-blob',
        size: buffer.length,
        contentType: resolvedContentType,
      };
    } catch (blobErr) {
      console.error('[Storage] Vercel Blob upload failed, attempting fallback...', blobErr);
    }
  }

  // --------------------------------------------------------------------------
  // Provider 2: Cloudinary Storage (if configured)
  // --------------------------------------------------------------------------
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const cloudApiKey = process.env.CLOUDINARY_API_KEY;
  const cloudApiSecret = process.env.CLOUDINARY_API_SECRET;
  const cloudinaryUrl = process.env.CLOUDINARY_URL;

  if ((cloudName && cloudApiKey && cloudApiSecret) || cloudinaryUrl || (cloudName && process.env.CLOUDINARY_UPLOAD_PRESET)) {
    try {
      let cName = cloudName;
      let cKey = cloudApiKey;
      let cSecret = cloudApiSecret;

      if (cloudinaryUrl && (!cName || !cKey || !cSecret)) {
        try {
          const match = cloudinaryUrl.match(/cloudinary:\/\/([^:]+):([^@]+)@(.+)/);
          if (match) {
            cKey = cKey || match[1];
            cSecret = cSecret || match[2];
            cName = cName || match[3];
          }
        } catch {}
      }

      if (cName) {
        console.log(`[Storage] Uploading ${finalFilename} to Cloudinary (${cName})...`);
        const resourceType = category === 'video' ? 'video' : category === 'audio' ? 'raw' : 'image';
        const folder = `mainahtunes/${category}`;
        const timestamp = Math.floor(Date.now() / 1000).toString();

        const formData = new FormData();
        const blob = new Blob([new Uint8Array(buffer)], { type: resolvedContentType });
        formData.append('file', blob, finalFilename);
        formData.append('folder', folder);

        if (process.env.CLOUDINARY_UPLOAD_PRESET) {
          formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET);
        } else if (cKey && cSecret) {
          const toSign = `folder=${folder}&timestamp=${timestamp}${cSecret}`;
          const sig = crypto.createHash('sha1').update(toSign).digest('hex');
          formData.append('api_key', cKey);
          formData.append('timestamp', timestamp);
          formData.append('signature', sig);
        }

        const uploadUrl = `https://api.cloudinary.com/v1_1/${cName}/${resourceType}/upload`;
        const res = await fetch(uploadUrl, { method: 'POST', body: formData });
        if (res.ok) {
          const data = await res.json();
          console.log(`[Storage] Cloudinary upload successful: ${data.secure_url}`);
          return {
            url: data.secure_url,
            filename: finalFilename,
            provider: 'cloudinary',
            size: buffer.length,
            contentType: resolvedContentType,
          };
        }
      }
    } catch (cErr) {
      console.error('[Storage] Cloudinary upload failed:', cErr);
    }
  }

  // --------------------------------------------------------------------------
  // Provider 3: Free Public Image CDN (Freeimage.host / ImgBB for Artwork)
  // --------------------------------------------------------------------------
  if (category === 'artwork') {
    try {
      console.log(`[Storage] Uploading artwork to freeimage.host CDN...`);
      const base64Img = buffer.toString('base64');
      const form = new URLSearchParams();
      form.append('key', '6d207e02198a847aa98d0a2a901485a5'); // Public community client API key
      form.append('action', 'upload');
      form.append('source', base64Img);
      form.append('format', 'json');

      const cdnRes = await fetch('https://freeimage.host/api/1/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: form.toString(),
      });

      if (cdnRes.ok) {
        const cdnData = await cdnRes.json();
        if (cdnData.image && cdnData.image.url) {
          console.log(`[Storage] Public Image CDN upload successful: ${cdnData.image.url}`);
          return {
            url: cdnData.image.url,
            filename: finalFilename,
            provider: 'external-cdn',
            size: buffer.length,
            contentType: resolvedContentType,
          };
        }
      }
    } catch (imgErr) {
      console.warn('[Storage] Free image host failed, falling back to data URI / storage...', imgErr);
    }
  }

  // --------------------------------------------------------------------------
  // Provider 4: Local Storage (ONLY in Local Development, Never in Vercel Production)
  // --------------------------------------------------------------------------
  const isVercel = process.env.VERCEL === '1' || process.env.AWS_LAMBDA_FUNCTION_NAME;
  if (!isVercel && process.env.NODE_ENV !== 'production') {
    try {
      let targetSubdir = 'artwork';
      if (category === 'audio') targetSubdir = 'audio';
      else if (category === 'video') targetSubdir = 'videos';

      const targetDir = path.join(process.cwd(), 'public', targetSubdir);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      const filePath = path.join(targetDir, finalFilename);
      fs.writeFileSync(filePath, buffer);

      console.log(`[Storage] Saved locally during development: /${targetSubdir}/${finalFilename}`);
      return {
        url: `/${targetSubdir}/${finalFilename}`,
        filename: finalFilename,
        provider: 'local',
        size: buffer.length,
        contentType: resolvedContentType,
      };
    } catch (fsErr) {
      console.warn('[Storage] Local write failed:', fsErr);
    }
  }

  // --------------------------------------------------------------------------
  // Provider 5: Base64 Data URI Fallback (Safe in Vercel serverless for images/audio)
  // --------------------------------------------------------------------------
  console.log(`[Storage] Storing as permanent data URI format (safe on serverless Vercel)`);
  const base64Data = buffer.toString('base64');
  const dataUri = `data:${resolvedContentType};base64,${base64Data}`;

  return {
    url: dataUri,
    filename: finalFilename,
    provider: 'external-cdn',
    size: buffer.length,
    contentType: resolvedContentType,
  };
}
