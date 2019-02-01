const { bootstrap } = require('@storefront/testing');
const chai = require('chai');

const vendorFiles = [];
const projectFiles = [
  'src/tags/components/example/example.html',
  'src/tags/components/example/example.css',
];

bootstrap(chai, __dirname, [
  ...vendorFiles,
  ...projectFiles,
]);
