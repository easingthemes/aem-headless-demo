export const MODELS = {
  adventure: {
    name: 'adventure',
    fields: `{
      title
      activity
      price
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
