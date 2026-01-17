const fs = require('fs-extra');

async function cleanupTempFile(filePath) {
  try {
    if (await fs.pathExists(filePath)) {
      await fs.remove(filePath);
      console.log(`🧹 Cleaned: ${filePath.split('/').pop()}`);
    }
  } catch (error) {
    console.warn(`⚠️  Cleanup failed: ${error.message}`);
  }
}

module.exports = { cleanupTempFile };
