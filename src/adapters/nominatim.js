export default {
  url: 'https://nominatim.openstreetmap.org/search',
  params: {
    limit: 1,
    format: 'json'
  },
  addressParam: 'q',
  parse: data => {
    const elt = data[0]
    return elt ? [parseFloat(elt.lon), parseFloat(elt.lat)] : null
  }
}
