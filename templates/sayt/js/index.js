storefront.polyfill(function() {

  var app = new storefront({
    customerId: '<%= customerId %>',
    area: '<%= area %>',
    collection: '<%= collection %>',

    structure: {
      id: '<%= id %>',
      title: '<%= title %>',
      price: '<%= price %>',
      image: '<%= imageurl %>'

      // define your data structure field mapping here!
    },

    search: {
      fields: ['*']
    },

    autocomplete: {

      recommendations: <%= recommendations ? "{\n        suggestionCount: 4,\n        suggestionMode: 'popular'\n      }" : false %>,

      navigations: {
        // ADD Navigations Here
        // 'data.navigation.name': 'Customer Friendly Name',

      },
      products: {
        count: <%= autocompleteProductCount %>
      }
    },

    services: {
      logging: {
        level: 'debug',
        debug: {
          // tracker: true,
          // flux: true,
          // lifecycle: true,
          // aliasing: true,
          // observer: true,
        }
      },
      recommendations: <%= recommendations %>
    },

    options: {
      stylish: false
    },

    tags: {
      sayt: {
        recommendations: <%= recommendations %>
      }
    }
  });

  // attach your top-level components here!
  // components nested under <app> will be mounted automatically

  app.mount('app');
});
