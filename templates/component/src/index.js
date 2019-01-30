import { tag } from '@storefront/core';

@tag('<%= slug %>', require('./<%= slug %>.html'), require('./<%= slug %>.scss'))
export class <%= sanitizedName %> {

}

export default <%= sanitizedName %>;
