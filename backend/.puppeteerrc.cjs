const { join } = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // This ensures the cache is created inside /backend/.cache
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};
