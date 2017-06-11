import {
  REQUEST_WEATHER,
  REQUEST_WEATHER_SUCCESS,
  REQUEST_WEATHER_FAILURE
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
    data: data
  }
}

function requestWeatherFailure(err) {
  return {
    type: REQUEST_WEATHER_FAILURE,
    error: err
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
