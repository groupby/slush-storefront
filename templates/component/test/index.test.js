const { expect } = require('chai');

const { <%= sanitizedName %> } = require('<%= relativePath %>');

describe('<%= sanitizedName %>', () => {
  let instance;

  beforeEach(() => {
    instance = new <%= sanitizedName %>();
  });

  describe('General', () => {
    it('should be importable', () => {
      expect(<%= sanitizedName %>).to.be.a('function');
    });

    it('should be constructable', () => {
      expect(new <%= sanitizedName %>()).to.be.an.instanceof(<%= sanitizedName %>);
    });
  });

  describe('Class methods', () => {
    describe('classMethod()', () => {
      // Make assertions about the class method under test.
      // For example: <%= sanitizedName %>.fetchData();
    });
  });

  describe('Class properties', () => {
    describe('classProperty', () => {
      // Make assertions about the class property under test.
      // For example: <%= sanitizedName %>.data;
    });
  });

  describe('Lifecycle methods', () => {
    describe('onBeforeMount()', () => {
      it('should be a function', () => {
        expect(instance.onBeforeMount).to.be.a('function');
      });

      // Make additional assertions here!
    });

    describe('onMount()', () => {
      it('should be a function', () => {
        expect(instance.onMount).to.be.a('function');
      });

      // Make additional assertions here!
    });

    describe('onUpdate()', () => {
      it('should be a function', () => {
        expect(instance.onUpdate).to.be.a('function');
      });

      // Make additional assertions here!
    });

    describe('onUpdated()', () => {
      it('should be a function', () => {
        expect(instance.onUpdated).to.be.a('function');
      });

      // Make additional assertions here!
    });

    describe('onBeforeUnmount()', () => {
      it('should be a function', () => {
        expect(instance.onBeforeUnmount).to.be.a('function');
      });

      // Make additional assertions here!
    });

    describe('onUnmount()', () => {
      it('should be a function', () => {
        expect(instance.onUnmount).to.be.a('function');
      });

      // Make additional assertions here!
    });
  });

  describe('Instance methods', () => {
    describe('instanceMethod()', () => {
      // Make assertions about the instance method under test.
      // For example:
      // const instance = new <%= sanitizedName %>();
      // instance.parseData();
    });
  });

  describe('Instance properties', () => {
    describe('instanceProperty', () => {
      // Make assertions about the instance property under test.
      // For example:
      // const instance = new <%= sanitizedName %>();
      // instance.recordCount;
    });
  });
});
