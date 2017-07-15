import * as ACTION from '../util/constants'
import fetch from 'isomorphic-fetch'
import { getNearestStations } from '../util/stations'
import encodeurl from 'encodeurl'

export function changeLocation(lat, long) {
  return {
    type: ACTION.CHANGE_LOCATION,
    lat,
    long,
    updatedAt: Date.now()
  }
}

export function requestMetar(icao) {
  return {
    type: ACTION.REQUEST_METAR,
    icao
  }
}

export function requestMetarSuccess(icao, data) {
  return {
    type: ACTION.REQUEST_METAR_SUCCESS,
    data,
    icao,
    updatedAt: Date.now()
  }
}

export function requestMetarFailure(icao, error) {
  return {
    type: ACTION.REQUEST_METAR_FAILURE,
    error,
    icao,
    updatedAt: Date.now()
  }
}

export function fetchMetar(icao) {
  return dispatch => {
    dispatch(requestMetar(icao))
    return fetch('http://avwx.rest/api/metar/' + icao)
      .then(response => {
        if(!response || !response.ok) {
          dispatch(requestMetarFailure(icao, "Failed to get METAR"))
        }
        return response.json()
      })
      .then(json => {
        if(json.Error) {
          dispatch(requestMetarFailure(icao, json.Error))
        } else {
          dispatch(requestMetarSuccess(icao, json))
        }
      })
  }
}

export function requestGeonames(lookup) {
  return {
    type: ACTION.REQUEST_GEONAMES,
    lookup
  }
}

export function requestGeonamesSuccess(lat, long, json) {
  return {
    type: ACTION.REQUEST_GEONAMES_SUCCESS,
    lat,
    long,
    json
  }
}

export function requestGeonamesFailure() {
  return {
    type: ACTION.REQUEST_GEONAMES_FAILURE
  }
}

export function fetchLocation(lookup) {
  return dispatch => {
    dispatch(requestGeonames(lookup))
    var geoname = processGeonameText(lookup.text)
    if(geoname.lat && geoname.long) {
      dispatch(requestGeonamesSuccess(geoname.lat, geoname.long))
      return dispatch(changeLocation(geoname.lat, geoname.long))
    }
    if(!geoname.text){
      return dispatch(requestGeonamesFailure())
    }
    return fetch('http://api.geonames.org/searchJSON?username=metar4u&q=' + encodeurl(lookup.text))
      .then(response => {
        if(!response || !response.ok) {
          dispatch(requestGeonamesFailure())
        }
        return response.json()
      })
      .then(json => {
        var latLong = getLatLongFromGeonamesResult(json)
        if(latLong.lat && latLong.long) {
          dispatch(requestGeonamesSuccess(latLong.lat, latLong.long, json))
          dispatch(changeLocation(latLong.lat, latLong.long))
        } else {
          dispatch(requestGeonamesFailure())
        }
      })
  }
}

const processGeonameText = text => {
  var result = {
    lat: undefined,
    long: undefined,
    text
  }
  var latLongRegex = /^(?:lat\D*?)*?(-?[\d]+\.?[\d]*)[\s]+(?:long\D*?)*?(-?[\d]+\.?[\d]*)$/
  if(text) {
    var matches = text.match(latLongRegex)
    if(matches) {
      result.lat = matches[1] //capture groups start on index 1
      result.long = matches[2]
    }
  }
  return result
}

function getLatLongFromGeonamesResult(result) {
  var geonames = result.geonames
  var latLong = {
    lat: undefined,
    long: undefined
  }

  if(geonames) {
    for(var i = 0; i < geonames.length; i++) {
      console.log(geonames[i])
      if(geonames[i].lat && geonames[i].lng) {
        latLong.lat = geonames[i].lat

        latLong.long = geonames[i].lng
        return latLong
      }
    }
  }
  return latLong
}
