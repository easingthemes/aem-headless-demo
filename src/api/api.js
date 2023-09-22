import { AEMHeadless } from '@adobe/aem-headless-client-js';
import { API_CONFIG } from './config';
import { MODELS } from './queries';

export class API {
  constructor(model = {}) {
    this.client = new AEMHeadless(API_CONFIG);
    const isPaginated = model.config && model.config.pageSize;
    if (isPaginated) {
      this.paginated = this.client.runPaginatedQuery(model.name, model.fields, model.config);
    }
  }
  
  // ByPath
  async fetchByPath(_path) {
    const { item } = MODELS;

    try {
      const { data } = await this.client.runModelQuery(item.name, item.fields, {}, { _path });
      return { data };
    } catch (e) {
      return {
        error: e.toJSON()
      }
    }
  }
  // Persisted
  async fetchCached({ model, variables }) {
    try {
      const { data } = await this.client.runPersistedQuery(model.path, variables);
      return {
        data: data[`${model.name}List`].items
      };
    } catch (e) {
      return {
        error: e.toJSON()
      }
    }
  }
  // List
  async fetchList(query, variables) {
    try {
      //
      const { data } = await this.client.runQuery({ query, variables });
      return {
        data: data.adventureList.items
      };
    } catch (e) {
      return {
        error: e.toJSON()
      }
    }
  }
  // Paginated
  async fetchPaginated() {
    try {
      const { value = {} } = await this.paginated.next();
      return {
        data: value.data,
        hasNext: value.hasNext,
      };
    } catch (e) {
      return {
        error: e
      }
    }
  }
}
