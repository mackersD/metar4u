import * as ACTION from '../util/constants'
import fetch from 'isomorphic-fetch'
function requestMetar(icao) {
  return {
    type: ACTION.REQUEST_METAR,
    icao
  }
}

function requestMetarSuccess(icao, data) {
  return {
    type: ACTION.REQUEST_METAR_SUCCESS,
    updatedAt: Date.now(),
    icao,
    data
  }
}

function requestMetarFailure(icao, error) {
  return {
    type: ACTION.REQUEST_METAR_FAILURE,
    icao,
    error
  }
}

function fetchMetar(icao) {
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

export function requestGeolocation() {
  return {
    type: ACTION.REQUEST_GEOLOCATION
  }
}

export function requestGeolocationSuccess(position) {
  return {
    type: ACTION.REQUEST_GEOLOCATION_SUCCESS,
    lat: position.coords.latitude,
    long: position.coords.longitude
  }
}

export function requestGeolocationFailure(err) {
  return {
    type: ACTION.REQUEST_GEOLOCATION_FAILURE,
    err
  }
}

export function bootstrapLocationAndMetars() {
  return (dispatch, getState) => {
    dispatch(requestGeolocation())
    if(navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(pos => {
         dispatch(requestGeolocationSuccess(pos))
         var { location } = getState()
         for(var i = 0; i < 20; i++) {
           dispatch(fetchMetar(location.nearestStations[i].icao))
         }
      })
    } else {
      dispatch(requestGeolocationFailure("Geolocation not supported"))
    }
  }
}
