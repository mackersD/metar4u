import * as ACTION from '../util/constants'
import fetch from 'isomorphic-fetch'
import { getNearestStations } from '../util/stations'
import encodeurl from 'encodeurl'

export function changeLocation(lat, long) {
  return {
    type: ACTION.CHANGE_LOCATION,
    lat,
    long
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
