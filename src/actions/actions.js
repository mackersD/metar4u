import {
  REQUEST_WEATHER,
  REQUEST_WEATHER_SUCCESS,
  REQUEST_WEATHER_FAILURE,
  REQUEST_GEOLOCATION,
  REQUEST_GEOLOCATION_SUCCESS,
  REQUEST_GEOLOCATION_FAILURE
} from '../util/constants'
import fetch from 'isomorphic-fetch'

function requestWeather() {
  return {
    type: REQUEST_WEATHER
  }
}

function requestWeatherSuccess(data) {
  return {
    type: REQUEST_WEATHER_SUCCESS,
    data
  }
}

function requestWeatherFailure(err) {
  return {
    type: REQUEST_WEATHER_FAILURE,
    err
  }
}

function fetchWeather() {
  return dispatch => {
    dispatch(requestWeather())
    return fetch('https://avwx.rest/api/metar/KGTU')
      .then(response => {
        if(!response || response.status !== 200) {
          dispatch(requestWeatherFailure("Failed to get Weather"))
        }
        return response.json()
      })
      .then(json => dispatch(requestWeatherSuccess(json)))
  }
}

export function fetchWeatherIfNeeded() {
  return (dispatch, getState) => {
    return dispatch(fetchWeather())
  }
}

export function requestGeolocation() {
  return {
    type: REQUEST_GEOLOCATION
  }
}

export function requestGeolocationSuccess(position) {
  return {
    type: REQUEST_GEOLOCATION_SUCCESS,
    lat: position.coords.latitude,
    long: position.coords.longitude
  }
}

export function requestGeolocationFailure(err) {
  return {
    type: REQUEST_GEOLOCATION_FAILURE,
    err
  }
}

export function fetchGeolocation() {
  return dispatch => {
    dispatch(requestGeolocation())
    if(navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(pos => {
         dispatch(requestGeolocationSuccess(pos))
      })
    } else {
      dispatch(requestGeolocationFailure("Geolocation not supported"))
    }
  }
}
