# node-geocodr

this simple component allows for geocoding from various providers

[![Build Status](https://travis-ci.org/tony-kerz/node-geocodr.svg?branch=master)](https://travis-ci.org/tony-kerz/node-geocodr)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

## currently supported adapters

[adapters](./adapters)

## example usage

> currently just returns an array of the form [lon, lat] or null if the address can't be geocoded

### geocode single
```
import geocode, {nominatim} from 'geocodr'

geocode('10021', nominatim).then((coordinates)=>{
  // do stuff with coordinates
})
```

### geocode multiple
```
import geocode, {geocodio} from 'geocodr'

geocode(['10021', '06067', '06108'], geocodio).then((coordinates)=>{
  // do stuff with coordinates (will be an array of [lon, lat] arrays in respective order)
})
```

### override default
```
import geocode, {mapzen} from 'geocodr'

geocode('10021', {...mapzen, api_key: 'my-api-key'}).then((coordinates)=>{
  // do stuff with coordinates
})
```
