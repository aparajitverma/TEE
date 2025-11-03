import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'blog');

async function ensureDirectoryExists(dirPath: string): Promise<void> {
  if (!existsSync(dirPath)) {
    await mkdir(dirPath, { recursive: true });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Simple validation
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 });
    }

    // Generate filename
    const timestamp = Date.now();
    const extension = path.extname(file.name);
    const filename = `image_${timestamp}${extension}`;
    
    // Ensure directory exists
    await ensureDirectoryExists(UPLOAD_DIR);

    // Save file
    const filePath = path.join(UPLOAD_DIR, filename);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await writeFile(filePath, buffer);

    // Return public URL
    const publicUrl = `/uploads/blog/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: filename
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
