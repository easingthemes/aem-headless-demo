export const MODELS = {
  filters: {
    name: 'adventure',
    path: 'wknd-shared/activities'
  },
  items: {
    name: 'adventure',
    fields: `{
      title
      activity
      _path
      primaryImage {
        ... on ImageRef {
          _path
        }
      }
    }`
  },
  item: {
    name: 'adventure',
    fields: `{
      title
      description {
        html
      }
      itinerary {
        html
      }
      primaryImage {
        ... on ImageRef {
          _path
        }
      }
    }`
  },
  query: `query ($filterVal: String) {
    adventureList(
      filter: {activity: {_expressions: [{value: $filterVal}]}}
      ) {
      items {
        title
        activity
        _path
        primaryImage {
          ... on ImageRef {
            _path
          }
        }
      }
    }
  }`
}
