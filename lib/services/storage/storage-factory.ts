import { StorageConfig, StorageProvider } from './types';
import { LocalStorageProvider } from './local-storage';
import { RedisStorageProvider } from './redis-storage';

export class StorageFactory {
  static createProvider(config: StorageConfig): StorageProvider {
    switch (config.provider) {
      case 'redis':
        if (!config.redis?.url || !config.redis?.token) {
          throw new Error('Redis configuration is missing');
        }
        return new RedisStorageProvider(config.redis.url, config.redis.token);
      
      case 'local':
      default:
        return new LocalStorageProvider();
    }
  }
}