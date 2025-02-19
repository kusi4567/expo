import fs from 'fs';

export async function directoryExistsAsync(file: string): Promise<boolean> {
  return (await fs.promises.stat(file).catch(() => null))?.isDirectory() ?? false;
}

export async function ensureDirectoryAsync(path: string): Promise<void> {
  await fs.promises.mkdir(path, { recursive: true });
}

export async function moveAsync(src: string, dest: string): Promise<void> {
  await fs.promises.rename(src, dest);
}
