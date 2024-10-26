# SnapCache 🌟

[![NPM Version](https://img.shields.io/npm/v/snapcache?style=for-the-badge)](https://www.npmjs.com/package/snapcache)
[![Repository Size](https://img.shields.io/github/repo-size/Alpha5959/snapcache?style=for-the-badge)](https://github.com/Alpha5959/snapcache)
[![License](https://img.shields.io/npm/l/snapcache?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Downloads](https://img.shields.io/npm/dt/snapcache?style=for-the-badge)](https://www.npmjs.com/package/snapcache)
[![Support](https://img.shields.io/badge/Support-Discord-7289d9?style=for-the-badge&logo=discord)](https://discord.com/invite/Rw5gRVqSaK)

A **lightweight**, **in-memory caching tool** for Node.js, designed for **efficiency** and **speed**. SnapCache offers a **configurable TTL** (Time-to-Live) and automatic eviction of old entries, ensuring optimal performance for your applications. 🚀

## Features ✨

- 🛠️ **Simple API**: User-friendly interface for developers of all levels.
- 🔄 **Configurable Max Size**: Set the maximum cache size according to your requirements.
- ⏳ **Customizable TTL**: Control how long items remain in the cache.
- 📉 **Automatic Eviction**: Oldest items are removed automatically when exceeding max size.
- 🧹 **Clear and Delete**: Manage your cache easily with straightforward commands.

## Installation 📦

To get started, install SnapCache using npm:

```bash
npm install snapcache@latest
```

## Usage Guide 🛠️

### Basic Example

Here’s a quick example to help you get started:

```javascript
const SnapCache = require('snapcache');

// Create a SnapCache instance
const cache = new SnapCache({ maxSize: 100, defaultTTL: 30000 }); // Default TTL of 30 seconds

// Store a value in the cache
cache.set('user:123', { name: 'Alice' }, { ttl: 60000 }); // 1 minute TTL

// Retrieve a value
const value = cache.get('user:123');
console.log(value); // { name: 'Alice' }

// Wait for the TTL to expire
setTimeout(() => {
  console.log(cache.get('user:123')); // null (expired)
}, 61000);
```

### Advanced Usage

#### Handling TTL and Eviction

You can customize the TTL for each item and configure the maximum size for your cache:

```javascript
// Create a new cache with a max size of 50 and default TTL of 10 seconds
const cache = new SnapCache({ maxSize: 50, defaultTTL: 10000 });

// Set values with different TTLs
cache.set('item1', { data: 'Sample Data 1' }, { ttl: 5000 }); // 5 seconds TTL
cache.set('item2', { data: 'Sample Data 2' }); // Uses default TTL of 10 seconds

// Wait and check the cache
setTimeout(() => {
  console.log(cache.get('item1')); // null (expired)
  console.log(cache.get('item2')); // { data: 'Sample Data 2' }
}, 6000);
```

#### Deleting and Clearing the Cache

You can delete specific items or clear the entire cache:

```javascript
cache.delete('item2'); // Delete specific item
console.log(cache.get('item2')); // null (deleted)

cache.clear(); // Clear all items
console.log(cache.get('item1')); // null (cleared)
```

## How It Works 🔍

- **Storing Values**: The `set` method stores a value with a key and calculates an expiration time based on the provided TTL.
- **Retrieving Values**: The `get` method checks if the item exists and hasn't expired. If it has expired, it removes it from the cache and returns `null`.
- **Automatic Eviction**: When the cache exceeds the maximum size, SnapCache automatically evicts the oldest item to make space for new entries.

## API Reference 📜

### `SnapCache(options)`

- **options**: An object to configure the cache.
  - `maxSize` (Number): The maximum number of items in the cache (default: 100).
  - `defaultTTL` (Number): The default time-to-live for items in milliseconds (default: 60000).

### `cache.set(key, value, options)`

- **key** (String): The key under which to store the value.
- **value** (Object): The value to cache.
- **options**: (Optional) An object to configure TTL for this entry.
  - `ttl` (Number): The time-to-live in milliseconds.

### `cache.get(key)`

- **key** (String): The key of the cached value.
- **Returns**: The cached value, or `null` if it doesn't exist or has expired.

### `cache.delete(key)`

- **key** (String): The key of the cached value to delete.
- **Returns**: `true` if the item was deleted, or `false` if it didn't exist.

### `cache.clear()`

- Clears all items from the cache.

## License 📝

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Contributing 🤝

We welcome contributions! If you'd like to help improve SnapCache, please follow these guidelines:

1. **Fork the Repository**: Click the "Fork" button on the top right of this page to create a personal copy of the project.
2. **Clone Your Fork**: Run the following command in your terminal:
   ```bash
   git clone https://github.com/blueboxlab/snapcache.git
   ```
3. **Create a New Branch**: Before making changes, create a new branch to keep your work separate:
   ```bash
   git checkout -b feature/my-feature
   ```
4. **Make Your Changes**: Implement your feature or fix a bug.
5. **Run Tests**: Ensure that your changes don’t break anything. Run:
   ```bash
   npm test
   ```
6. **Commit Your Changes**: Use descriptive commit messages.
   ```bash
   git commit -m "Add feature X"
   ```
7. **Push to Your Fork**: Push your changes to your GitHub fork:
   ```bash
   git push origin feature/my-feature
   ```
8. **Open a Pull Request**: Go to the original repository and click "New Pull Request".

### Reporting Issues
If you find any bugs or have feature requests, please open an issue in the [GitHub Issues](https://github.com/Alpha5959/snapcache/issues) page.

## Bugs and Issues 🐞

If you encounter any bugs or have feature requests, please report them at [GitHub Issues](https://github.com/Alpha5959/snapcache/issues).