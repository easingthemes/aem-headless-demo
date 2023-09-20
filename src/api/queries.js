export const MODELS = {
  activities: {
    name: 'adventure',
    path: 'wknd-shared/activities'
  },
  adventure: {
    name: 'adventure',
    config: {
      pageSize: 6
    },
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
  article: {
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
  }
}

export const adventureList = {
  query:   `query ($offset: Int, $limit: Int, $sort: String, $imageFormat: AssetTransformFormat=JPG, $imageWidth: Int=1200, $imageQuality: Int=80) {
    adventureList(
      offset: $offset
      limit: $limit
      sort: $sort
      _assetTransform: {
        format: $imageFormat
        width: $imageWidth
        quality: $imageQuality
        preferWebp: true
    }) {
      items {
        _path
        slug
        title
        activity
        price
        tripLength
        primaryImage {
          ... on ImageRef {
            _path
            _dynamicUrl
          }
        }
      }
    }
  }`,
  variables: {
    imageWidth: 400
  }
};

export const itemByPath = `
  query getItemByPath($itemPath: String!) {
    adventureByPath(_path: $itemPath) {
      item {
        title
        slug
        description {
          html
        }
        activity
        primaryImage {
          ... on ImageRef {
            _path
          }
        }
        itinerary {
          html
        }
      }
    }
  }
`;
