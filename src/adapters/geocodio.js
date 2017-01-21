function parse(data) {
  const elt = data.results[0]
  return elt ? [elt.location.lng, elt.location.lat] : null
}

export default {
  url: 'https://api.geocod.io/v1/geocode',
  params: {
    // eslint-disable-next-line camelcase
    api_key: '668544c7ccac3c666c8635ac9a9a765ac874ccf'
  },
  addressParam: 'q',
  parse: data => {
    return parse(data)
  },
  formatMulti: addresses => {
    return addresses
  },
  parseMulti: data => {
    return data.results.map(
      elt => {
        return parse(elt.response)
      }
    )
  }
}
