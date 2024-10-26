class LRU {
    constructor(cache) {
      this.cache = cache;
    }
  
    evict() {
      const oldestKey = this.cache.cache.keys().next().value;
      this.cache.cache.delete(oldestKey);
    }
  }
  
  module.exports = { LRU };
  