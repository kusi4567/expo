import fs from 'fs';

export async function directoryExistsAsync(file: string): Promise<boolean> {
  return (await fs.promises.stat(file).catch(() => null))?.isDirectory() ?? false;
}

export async function ensureDirectoryAsync(path: string): Promise<void> {
  await fs.promises.mkdir(path, { recursive: true });
}

export async function moveAsync(src: string, dest: string): Promise<void> {
  try {
    await fs.promises.rename(src, dest);
  } catch (error: any) {
    // NOTE(@kitten): Unsure if this can happen across file systems, so it's better to handle that case
    if (error.code === 'EXDEV') {
      await fs.promises.cp(src, dest, { errorOnExist: true, recursive: true });
      await fs.promises.rm(src, { recursive: true, force: true });
    } else {
      throw error;
    }
  }
}
