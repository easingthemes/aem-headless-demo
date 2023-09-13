import { AEMHeadless } from '@adobe/aem-headless-client-js';

export class API {
  constructor(props) {
    this.aemHeadlessClient = new AEMHeadless({
      serviceURL: 'http://localhost:4502',
      endpoint: '/content/_cq_graphql/wknd-shared/endpoint.json',
      auth: ['admin', 'admin']
    });
  }
  
  init() {
    const queryString = `{
      contentItemList {
        items {
          label
        }
      }
    }`;
    
    this.aemHeadlessClient.runQuery(queryString)
      .then(data => console.log(data))
      .catch(e => console.error(e.toJSON()));
  }
}
