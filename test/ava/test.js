import test from 'ava'
import geocode, {mapzen, nominatim, geocodio} from '../../src'

test('should work with mapzen', async t => {
  const address = 'NY 10021'
  const coordinates = await geocode(address, mapzen)
  t.is(coordinates.length, 2)
  t.is(coordinates[0], -73.963654)
  t.is(coordinates[1], 40.768673)
})

test('should work with nominatim', async t => {
  const address = '10021'
  const coordinates = await geocode(address, nominatim)
  t.is(coordinates.length, 2)
  t.is(coordinates[0], -73.9508885)
  t.is(coordinates[1], 40.7666562)
})

test('should work with geocodio', async t => {
  const address = '10021'
  const coordinates = await geocode(address, geocodio)
  t.is(coordinates.length, 2)
  t.is(coordinates[0], -73.960257)
  t.is(coordinates[1], 40.768823)
})

test('should work with geocodio multi', async t => {
  const addresses = ['10021', '06067']
  const coordinates = await geocode(addresses, geocodio)
  t.is(coordinates.length, 2)
  const first = coordinates[0]
  t.is(first.length, 2)
  t.is(first[0], -73.960257)
  t.is(first[1], 40.768823)
  const second = coordinates[1]
  t.is(second.length, 2)
  t.is(second[0], -72.670887)
  t.is(second[1], 41.657249)
})

test('should fail gracefully with mapzen', async t => {
  const address = 'nowheresville, 10101'
  const coordinates = await geocode(address, mapzen)
  t.falsy(coordinates)
})

test('should fail gracefully with nominatim', async t => {
  const address = 'M.SHAREEFF.NEUROLOGY,P.C. HUNTINGTON,, NY 11743'
  const coordinates = await geocode(address, nominatim)
  t.falsy(coordinates)
})
