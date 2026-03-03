const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const envPath = path.join(repoRoot, '.env');
const envProdPath = path.join(repoRoot, '.env.production');

function main() {
  // If .env.production already exists, do nothing.
  if (fs.existsSync(envProdPath)) {
    console.log('.env.production already exists — leaving it unchanged');
    return;
  }

  if (!fs.existsSync(envPath)) {
    console.log('No .env file found to copy to .env.production — skipping');
    return;
  }

  // Copy .env -> .env.production
  fs.copyFileSync(envPath, envProdPath);
  console.log('Copied .env -> .env.production to ensure production build picks up NEXT_PUBLIC_* variables');
  console.log('Note: consider managing secrets outside the repo for CI/production environments.');
}

main();
