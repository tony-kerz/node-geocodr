export default {
  url: 'https://search.mapzen.com/v1/search',
  params: {
    // eslint-disable-next-line camelcase
    api_key: 'search-ND7BVJ',
    'boundary.country': 'USA',
    size: 1
  },
  addressParam: 'text',
  parse: data => {
    const elt = data.features[0]
    return elt ? elt.geometry.coordinates : null
  }
}
