class LRU {
  constructor(cache) {
    this.cache = cache;
    this.accessOrder = [];
  }

  updateAccessOrder(key) {
    const index = this.accessOrder.indexOf(key);
    if (index > -1) {
      this.accessOrder.splice(index, 1);
    }
    this.accessOrder.push(key);
  }

  evict() {
    const leastRecentlyUsedKey = this.accessOrder.shift();
    if (leastRecentlyUsedKey) {
      this.cache.cache.delete(leastRecentlyUsedKey);
    }
  }
}



class FIFO {
  constructor(cache) {
    this.cache = cache;
    this.order = [];
  }

  addToOrder(key) {
    this.order.push(key);
  }

  evict() {
    const oldestKey = this.order.shift();
    if (oldestKey) {
      this.cache.cache.delete(oldestKey);
    }
  }

  removeFromOrder(key) {
    const index = this.order.indexOf(key);
    if (index > -1) {
      this.order.splice(index, 1);
    }
  }
}



module.exports = { LRU, FIFO };
