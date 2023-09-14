import { AEMHeadless } from '@adobe/aem-headless-client-js';
import { adventureList, priceFilter } from './queries';
import { ACTIONS } from './actions';

export class API {
  constructor() {
    this.client = new AEMHeadless({
      serviceURL: 'http://localhost:4502',
      endpoint: '/content/_cq_graphql/wknd-shared/endpoint.json',
      auth: ['admin', 'admin']
    });
  }
  
  async [ACTIONS.fetchItems]() {
    try {
      const res = await this.client.runQuery(adventureList);
      return {
        data: res.data.adventureList.items
      };
    } catch (e) {
      return {
        error: e.toJSON()
      }
    }
  }
  
  async [ACTIONS.filterPrice]() {
    return this.client.runQuery(priceFilter);
  }
}
