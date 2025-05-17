import { mkdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { CacheError, err, ok, Result } from '../../core/types/result';

interface ErrnoException extends Error {
  errno?: number;
  code?: string;
  path?: string;
  syscall?: string;
}

export class FileSystemCacheManager {
  constructor(private readonly cacheDir: string = 'cache') {}

  private getCachePath(key: string): string {
    return join(this.cacheDir, `${key}.json`);
  }

  async init(): Promise<Result<void>> {
    try {
      await mkdir(this.cacheDir, { recursive: true });
      return ok(undefined);
    } catch (error) {
      return err(new CacheError('Failed to initialize cache directory', error));
    }
  }

  async get<T>(key: string): Promise<Result<T | null>> {
    try {
      const path = this.getCachePath(key);
      const data = await readFile(path, 'utf-8');
      return ok(JSON.parse(data) as T);
    } catch (error) {
      if ((error as ErrnoException).code === 'ENOENT') {
        return ok(null);
      }
      return err(new CacheError('Failed to read from cache', error));
    }
  }

  async set<T>(key: string, value: T): Promise<Result<void>> {
    try {
      const path = this.getCachePath(key);
      await writeFile(path, JSON.stringify(value), 'utf-8');
      return ok(undefined);
    } catch (error) {
      return err(new CacheError('Failed to write to cache', error));
    }
  }
}
