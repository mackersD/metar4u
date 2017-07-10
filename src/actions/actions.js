import * as ACTION from '../util/constants'
import fetch from 'isomorphic-fetch'
import { getNearestStations } from '../util/stations'
import encodeurl from 'encodeurl'

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

export function addMetar(options) {
  return {
    type: ACTION.ADD_METAR,
    icao: options.icao,
    distance: options.distance,
    bearing: options.bearing
  }
}

export function updateMetarStation(icao, newStation) {
  return {
    type: ACTION.UPDATE_METAR_STATION,
    icao,
    newIcao: newStation.icao,
    newDistance: newStation.distance,
    newBearing: newStation.bearing,
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

export function updateMetarsLocation(lat, long) {
  return (dispatch, getState) => {
    var nearestStations = getNearestStations(lat, long)
    var metars = getState().metars
    for(var i = 0; i < metars.length; i++) {
      var metar = metars[i]
      dispatch(updateMetarStation(metar.icao, nearestStations[i]))
      dispatch(fetchMetar(nearestStations[i].icao))
    }
  }
}

export function requestGeolocation() {
  return {
    type: ACTION.REQUEST_GEOLOCATION
  }
}

export function requestGeolocationSuccess(lat, long) {
  return {
    type: ACTION.REQUEST_GEOLOCATION_SUCCESS,
    lat,
    long
  }
}

export function requestGeolocationFailure(err) {
  return {
    type: ACTION.REQUEST_GEOLOCATION_FAILURE,
    err
  }
}

export function searchGeoname(text) {
  return {
    type: ACTION.SEARCH_GEONAME,
    text
  }
}

export function searchGeonameResult(result) {
  return {
    type: ACTION.SEARCH_GEONAME_RESULT,
    result
  }
}

export function fetchGeoname(geoname) {
  return (dispatch, getState) => {
    if(geoname.lat && geoname.long) {
      return dispatch(updateMetarsLocation(geoname.lat, geoname.long))
    }
    dispatch(searchGeoname(geoname.text))

    return fetch("http://api.geonames.org/searchJSON?username=metar4u&q=" + encodeurl(geoname.text))
      .then(response => {
        if(!response || !response.ok) {
        }
        return response.json()
      })
      .then(json => {
        var latLong = getLatLongFromGeonameResult(json)
        dispatch(updateMetarsLocation(latLong.lat, latLong.long))
      })
  }
}

function getLatLongFromGeonameResult(result) {
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

export function bootstrapLocationAndMetars(count) {
  return (dispatch, getState) => {
    dispatch(requestGeolocation())
    if(navigator.geolocation && navigator.geolocation.getCurrentPosition) {
      return navigator.geolocation.getCurrentPosition(pos => {
        var lat = pos.coords.latitude
        var long = pos.coords.longitude
         dispatch(requestGeolocationSuccess(lat, long))
         var stations = getNearestStations(lat, long)
         for(var i = 0; i < count; i++) {
           dispatch(addMetar(stations[i]))
           dispatch(fetchMetar(stations[i].icao))
         }
      })
    } else {
      dispatch(requestGeolocationFailure("Geolocation not supported"))
    }
  }
}
