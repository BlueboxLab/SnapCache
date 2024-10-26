const { LRU } = require('./eviction');
const { generateCacheKey, isType } = require('./utils');

class SnapCache {
  constructor({ maxSize = 100, defaultTTL = 60000, evictionStrategy = 'LRU' } = {}) {
    this.cache = new Map();
    this.maxSize = maxSize;
    this.defaultTTL = defaultTTL;

    this.evictionStrategy = this._selectEvictionStrategy(evictionStrategy);
  }

  _selectEvictionStrategy(strategy) {
    switch (strategy) {
      case 'LRU':
        return new LRU(this);
      default:
        throw new Error('Invalid eviction strategy');
    }
  }

  set(key, value, { ttl = this.defaultTTL } = {}) {
    if (!isType(key, 'string') && !isType(key, 'object')) {
      throw new Error('Key must be a string or object.');
    }
    if (!isType(value, 'object')) {
      throw new Error('Value must be an object.');
    }

    const cacheKey = generateCacheKey(key);
    const expiresAt = Date.now() + ttl;
    this.cache.set(cacheKey, { value, expiresAt });

    if (this.cache.size > this.maxSize) this.evictionStrategy.evict();
  }

  get(key) {
    const cacheKey = generateCacheKey(key);
    const entry = this.cache.get(cacheKey);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(cacheKey);
      return null;
    }
    return entry.value;
  }

  delete(key) {
    const cacheKey = generateCacheKey(key);
    return this.cache.delete(cacheKey);
  }

  clear() {
    this.cache.clear();
  }
}

module.exports = SnapCache;
