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
  
  async fetchItem({ variables }) {
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
      const response = await this.client.runPersistedQuery('wknd-shared/activities', variables);
      return {
        data: response.data.adventureList.items
      };
    } catch (e) {
      return {
        error: e.toJSON()
      }
    }
  }
  
  async fetchItemsForModel({ model, _path, filter, variables }) {
    let args = {};
    if (filter && Object.keys(filter).length > 0) {
      args = {
        filter: {},
      };
      Object.entries(filter).forEach(([key, value]) => {
        args.filter[key] = {_expressions: [{value}]}
      });
    }
    
    if (_path) {
      args._path = _path;
    }
    
    const { query, type } = this.client.buildQuery(model.name, model.fields, {
      useLimitOffset: true
    }, args);
    const { data, error } = await this.runQuery(query, variables);
    const list = data?.[`${model.name}${type}`];
    return { data: list?.items || list?.item, error };
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
