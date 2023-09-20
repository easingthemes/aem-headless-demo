import { AEMHeadless } from '@adobe/aem-headless-client-js';
import { API_CONFIG } from './config';

export class API {
  constructor() {
    this.client = new AEMHeadless(API_CONFIG);
  }
  
  async initPaginatedQuery(model) {
    return this.client.runPaginatedQuery(model.name, model.fields, model.config);
  }
  
  setFilters(filter) {
    if (!filter || Object.keys(filter).length === 0) {
      return null;
    }
    const filters = {};
    Object.entries(filter).forEach(([key, value]) => {
      filters[key] = {_expressions: [{value}]}
    });
    return filters;
  }
  
  getBody(query, variables) {
    if (typeof query === 'string') {
      return {
        query,
        variables
      }
    }
    
    return {
      query: query.query,
      variables: query.variables ? { ...query.variables, ...variables } : variables
    }
  }
  
  async fetchItemsForModel({ model, _path, filter, variables, cursorQuery }) {
    const filters = this.setFilters(filter);
    const args = {};

    if (filters) {
      args.filter = filters;
    }
    
    if (_path) {
      args._path = _path;
    }

    const { data, error, type } = await this.fetchData(model, args, variables, cursorQuery);
    const list = this.getItems(data, model.name, type);

    return { data: list, error };
  }
  
  getItems(data, name, type) {
    const list = data?.[`${name}${type}`];
    switch (type) {
      case 'Paginated':
        return data
      case 'ByPath':
        return list?.item
      default:
        return list?.items
    }
  }
  
  async fetchData(model, args, variables, cursorQuery) {
    if (model.path) {
      const { data, error } = await this.runPersistedQuery(model.path, variables);
      return { data, error, type: model.type || 'List' };
    }
    const config = model.config || {
      useLimitOffset: true
    };
    const { query, type } = this.client.buildQuery(model.name, model.fields, config, args);

    if (type === 'Paginated') {
      const { data, error } = await this.runPaginatedQuery(cursorQuery);
      return { data, error, type };
    }
    
    const { data, error } = await this.runQuery(query, variables);
    return { data, error, type };
  }
  
  async runQuery(query, variables = {}) {
    const body = this.getBody(query, variables);
    
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
  
  async runPersistedQuery(path, variables) {
    try {
      const response = await this.client.runPersistedQuery(path, variables);
      return {
        data: response.data
      };
    } catch (e) {
      return {
        error: e.toJSON()
      }
    }
  }
  
  async runPaginatedQuery(cursorQuery) {
    try {
      const { done, value } = await cursorQuery.next();
      return {
        data: value
      };
    } catch (e) {
      return {
        error: e
      }
    }
  }
}
