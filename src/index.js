import assert from 'assert'
import axios from 'axios'
import debug from 'debug'
import Timer from 'tymer'

export * from './adapters'

const dbg = debug('app:geocodr')

function retryFailedRequest(err) {
  if (err.status === 504 && err.config && !err.config.__isRetryRequest) {
    err.config.__isRetryRequest = true
    return axios(err.config)
  }
  throw err
}
axios.interceptors.response.use(undefined, retryFailedRequest)

export default async function (address, {url, params, addressParam, parse, formatMulti, parseMulti}) {
  const timer = new Timer()
  let coordinates
  let _address
  let _coordinates
  if (Array.isArray(address)) {
    _address = `${address[0]}...`
    dbg('submitting batch=%o, size=%o, url=%o', _address, address.length, url)
    assert(formatMulti && parseMulti, 'formatMulti and parseMulti options required')
    const res = await axios.post(url, formatMulti(address), {params})
    // dbg('geocode: res.data=%s', JSON.stringify(res.data, null, 2))
    coordinates = parseMulti(res.data)
    _coordinates = `[ ${coordinates[0]} ]...`
  } else {
    _address = address
    const res = await axios.get(url, {params: {...params, [addressParam]: address}})
    coordinates = parse(res.data)
    _coordinates = coordinates
  }

  dbg('address=%s, coordinates=%o, elapsed=%o', _address, _coordinates, timer.stop())

  return coordinates
}
