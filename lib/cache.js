const { LRU, FIFO } = require('./eviction');
const { generateCacheKey, isType, convertToMilliseconds } = require('./utils');

class SnapCache {
  constructor({
    maxSize = 100,
    defaultTTL = 60000,
    evictionStrategy = 'LRU',
    cleanupInterval = 60000,
  } = {}) {
    if (maxSize <= 0) {
      throw new Error('Max size must be greater than zero.');
    }
    this.cache = new Map();
    this.maxSize = maxSize;
    this.defaultTTL = defaultTTL;
    this.evictionStrategy = this._selectEvictionStrategy(evictionStrategy);

    if (cleanupInterval > 0) {
      this.cleanupInterval = setInterval(this._cleanupExpired.bind(this), cleanupInterval);
    }
  }

  _selectEvictionStrategy(strategy) {
    switch (strategy) {
      case 'LRU':
        return new LRU(this);
      case 'FIFO':
        return new FIFO(this);
      default:
        throw new Error('Invalid eviction strategy');
    }
  }

  _validateKeyAndValue(key, value) {
    if (!isType(key, 'string') && !isType(key, 'object')) {
      throw new Error('Key must be a string or object.');
    }
    if (!isType(value, 'object')) {
      throw new Error('Value must be an object.');
    }
  }

  set(key, value, { ttl = this.defaultTTL, ttlUnit = 'ms' } = {}) {
    if (!isType(key, 'string') && !isType(key, 'object')) {
      throw new Error('Key must be a string or object.');
    }
    if (!isType(value, 'object')) {
      throw new Error('Value must be an object.');
    }
  
    const cacheKey = generateCacheKey(key);
    const expiresAt = Date.now() + convertToMilliseconds(ttl, ttlUnit);
    this.cache.set(cacheKey, { value, expiresAt });
  
    if (this.evictionStrategy instanceof FIFO) {
      this.evictionStrategy.addToOrder(cacheKey);
    }
  
    if (this.evictionStrategy instanceof LRU) {
      this.evictionStrategy.updateAccessOrder(cacheKey);
    }
  
    if (this.cache.size > this.maxSize) {
      this.evictionStrategy.evict();
    }
  }
  
  
  get(key) {
    const cacheKey = generateCacheKey(key);
    const entry = this.cache.get(cacheKey);
    if (!entry) return null;
  
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(cacheKey);

      if (this.evictionStrategy instanceof LRU) {
        this.evictionStrategy.updateAccessOrder(cacheKey);
      }
      return null;
    }
  
    if (this.evictionStrategy instanceof LRU) {
      this.evictionStrategy.updateAccessOrder(cacheKey);
    }
  
    return entry.value;
  }
  
  
  delete(key) {
    const cacheKey = generateCacheKey(key);
    const deleted = this.cache.delete(cacheKey);
    if (deleted && this.evictionStrategy instanceof FIFO) {
      this.evictionStrategy.removeFromOrder(cacheKey);
    }
    return deleted;
  }

  clear() {
    this.cache.clear();
    this.stopCleanup();
  }

  stopCleanup() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }


  _cleanupExpired() {
    const now = Date.now();
    for (const [key, entry] of this.cache) {
      if (entry.expiresAt < now) {
        this.cache.delete(key);
        if (this.evictionStrategy instanceof FIFO) {
          this.evictionStrategy.removeFromOrder(key);
        }
      }
    }
  }
}

module.exports = SnapCache;
