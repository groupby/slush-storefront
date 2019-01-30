import { tag } from '@storefront/core';

@tag('<%= slug %>', require('./<%= slug %>.html'), require('./<%= slug %>.scss'))
export class <%= sanitizedName %> {
  onBeforeMount() {
    console.log('__ ...'); // TEMP
  }

  onMount() {
    console.log('__ ...'); // TEMP
  }

  onUpdate() {
    console.log('__ ...'); // TEMP
  }

  onUpdated() {
    console.log('__ ...'); // TEMP
  }

  onBeforeUnmount() {
    console.log('__ ...'); // TEMP
  }

  onUnmount() {
    console.log('__ ...'); // TEMP
  }
}

export default <%= sanitizedName %>;
