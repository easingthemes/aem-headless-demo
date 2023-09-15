import { AEMHeadless } from '@adobe/aem-headless-client-js';
import { adventureList } from './queries';

export class API {
  constructor() {
    this.client = new AEMHeadless({
      serviceURL: 'http://localhost:4502',
      endpoint: '/content/_cq_graphql/wknd-shared/endpoint.json',
      auth: ['admin', 'admin']
    });
  }
  
  async fetchItems({ variables }) {
    try {
      const response = await this.client.runQuery(adventureList);
      return {
        data: response.data.adventureList.items
      };
    } catch (e) {
      return {
        error: e.toJSON()
      }
    }
  }
  
  async fetchCachedItems({ variables }) {
    try {
      const response = await this.client.runPersistedQuery('wknd-shared/adventures-all', variables);
      return {
        data: response.data.adventureList.items
      };
    } catch (e) {
      return {
        error: e.toJSON()
      }
    }
  }
  
  async fetchItemsForModel({ model, filter, variables }) {
    let args = {};
    if (filter && Object.keys(filter).length > 0) {
      args = {
        filter: {}
      };
      Object.entries(filter).forEach(([key, value]) => {
        args.filter[key] = {_expressions: [{value}]}
      });
    }
    
    const { query } = this.client.buildQuery(model.name, model.fields, {
      useLimitOffset: true,
      pageSize: 100
    }, args);
    const { data, error } = await this.runQuery(query, variables);
    return { data: data?.[`${model.name}List`]?.items, error };
  }
  
  async runQuery(query, variables = {}) {
    let body;
    if (typeof query === 'string') {
      body = {
        query,
        variables
      }
    } else {
      body = {
        query: query.query,
        variables: query.variables ? { ...query.variables, ...variables } : variables
      }
    }
    
    try {
      const response = await this.client.runQuery(body);
      return {
        data: response.data
      };
    } catch (e) {
      return {
        error: e.toJSON()
      }
    }
  }
}
