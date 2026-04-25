const { join } = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Directs Puppeteer to install Chrome into a specific cache folder
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};
