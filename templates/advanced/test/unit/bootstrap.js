const { bootstrap } = require('@storefront/testing');
const chai = require('chai');

bootstrap(chai, __dirname, [
  'src/tags/components/example/example.html',
  'src/tags/components/example/example.css',
]);
