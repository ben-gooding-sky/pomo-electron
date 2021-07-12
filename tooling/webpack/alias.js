const path = require('path');

const root = process.cwd();

const shared = {
  '@shared': path.resolve(root, 'shared'),
  '@electron': path.resolve(root, 'electron'),
  'package.json': path.resolve(root, 'package.json'),
};

const client = {
  '@client': path.resolve(root, 'client'),
};

const server = {
  '@electron': path.resolve(root, 'electron'),
};

module.exports = {
  shared,
  client,
  server,
};
