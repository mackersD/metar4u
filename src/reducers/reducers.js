import * as ACTION from '../util/constants'
import { combineReducers } from 'redux'
import { getNearestStations } from '../util/stations'

const location = (state = {
  lat: 0.0,
  long: 0.0,
  isFetching: false,
  nearestStations: []
}, action) => {
  switch(action.type) {
    case ACTION.REQUEST_GEOLOCATION:
      return Object.assign({}, state, {
        isFetching: true
      })
    case ACTION.REQUEST_GEOLOCATION_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        lat: action.lat,
        long: action.long,
        nearestStations: getNearestStations(action.lat, action.long)
      })
    case ACTION.REQUEST_GEOLOCATION_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })
    default:
      return state
  }
}

const metars = (state = [], action) => {
  var index = state.findIndex((elem) => elem.icao === action.icao)
  let metar
  switch(action.type) {
    case ACTION.REQUEST_METAR:
      if(index < 0) {
        return [...state, {
          isFetching: true,
          isFailed: false,
          icao: action.icao
        }]
      } else {
        metar = Object.assign({}, state[index], {
          isFetching: true
        })
        return [
          ...state.slice(0, index),
          metar,
          ...state.slice(index + 1)
        ]
      }
    case ACTION.REQUEST_METAR_SUCCESS:
      if(index < 0) {
        return state
      }
      metar = Object.assign({}, state[index], {
        isFetching: false,
        isFailed: false,
        updatedAt: action.updatedAt,
        ...action.data
      })
      return [
        ...state.slice(0, index),
        metar,
        ...state.slice(index + 1)
      ]
    case ACTION.REQUEST_METAR_FAILURE:
      if(index < 0) {
        return state
      }
      metar = Object.assign({}, state[index], {
        isFetching: false,
        isFailed: true,
        error: action.error
      })
      return [
        ...state.slice(0, index),
        metar,
        ...state.slice(index + 1)
      ]
    default:
      return state
  }
}

const rootReducer = combineReducers({
  location,
  metars
})

export default rootReducer
