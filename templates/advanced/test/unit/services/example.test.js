const { expect } = require('chai');

const ExampleService = require('../../../src/services/example');

describe('ExampleService', () => {
  describe('General', () => {
    it('should be importable', () => {
      expect(ExampleService).to.be.a('function');
    });

    it('should be constructable', () => {
      expect(new ExampleService).to.be.an.instanceof(ExampleService);
    });
  });

  describe('Class methods', () => {
    describe('classMethod()', () => {
      // Make assertions about the class method under test.
      // For example: ExampleService.fetchData();
    });
  });

  describe('Class properties', () => {
    describe('classProperty', () => {
      // Make assertions about the class property under test.
      // For example: ExampleService.data;
    });
  });

  describe('Instance methods', () => {
    describe('instanceMethod()', () => {
      // Make assertions about the instance method under test.
      // For example:
      // const exampleInstance = new ExampleService();
      // exampleInstance.parseData();
    });
  });

  describe('Instance properties', () => {
    describe('instanceProperty', () => {
      // Make assertions about the instance property under test.
      // For example:
      // const exampleInstance = new ExampleService();
      // exampleInstance.recordCount;
    });
  });
});
