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

export const priceFilter = {
  query: `query filterAdventuresByPrice($price: Float!, $priceOperator: FloatOperator!, $imageFormat: AssetTransformFormat=JPG, $imageWidth: Int=1200, $imageQuality: Int=80) {
    adventureList(
      sort: "price ASC"
      filter: {price: {_expressions: [{value: $price, _operator: $priceOperator}]}}
      _assetTransform: {
        format: $imageFormat
        width: $imageWidth
        quality: $imageQuality
        preferWebp: true
    }) {
      items {
        _path
        title
        slug
        activity
        adventureType
        price
        tripLength
        groupSize
        difficulty
        price
        primaryImage {
          ... on ImageRef {
            _path
            _dynamicUrl
          }
        }
        description {
          json
          plaintext
          html
        }
        itinerary {
          json
          plaintext
          html
        }
      }
    }
  }`,
  variables: {
    "price": 1200,
    "priceOperator": "LOWER"
  }
}
