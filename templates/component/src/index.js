import { tag } from '@storefront/core';

@tag('<%= slug %>', require('./<%= slug %>.html'), require('./<%= slug %>.html'))
export class <%= sanitizedName %> {

}

export default <%= sanitizedName %>
