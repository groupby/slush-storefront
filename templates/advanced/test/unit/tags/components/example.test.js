const { expect } = require('chai');

const { ExampleComponent } = require('../../../../src/tags/components/example/example');

describe('ExampleComponent', () => {
  let instance;

  beforeEach(() => {
    instance = new ExampleComponent();
  });

  describe('General', () => {
    it('should be importable', () => {
      expect(ExampleComponent).to.be.a('function');
    });

    it('should be constructable', () => {
      expect(new ExampleComponent()).to.be.an.instanceof(ExampleComponent);
    });
  });

  describe('Class methods', () => {
    describe('classMethod()', () => {
      // Make assertions about the class method under test.
      // For example: ExampleComponent.fetchData();
    });
  });

  describe('Class properties', () => {
    describe('classProperty', () => {
      // Make assertions about the class property under test.
      // For example: ExampleComponent.data;
    });
  });

  describe('Lifecycle methods', () => {
    describe('lifecycleMethod()', () => {
      // Make assertions about the lifecycle method under test.
      // For example:
      // const exampleInstance = new ExampleComponent();
      // exampleInstance.onUpdate();
    });
  });

  describe('Instance methods', () => {
    describe('instanceMethod()', () => {
      // Make assertions about the instance method under test.
      // For example:
      // const exampleInstance = new ExampleComponent();
      // exampleInstance.parseData();
    });
  });

  describe('Instance properties', () => {
    describe('instanceProperty', () => {
      // Make assertions about the instance property under test.
      // For example:
      // const exampleInstance = new ExampleComponent();
      // exampleInstance.recordCount;
    });
  });
});
