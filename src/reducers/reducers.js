import * as ACTION from '../util/constants'
import { combineReducers } from 'redux'

const location = (state = {
  isFailed: false,
  isFetching: false,
  lat: undefined,
  long: undefined
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
        long: action.long
      })
    case ACTION.REQUEST_GEOLOCATION_FAILURE:
      return Object.assign({}, state, {
        isFailed: true,
        isFetching: false
      })
    default:
      return state
  }
}

const metar = (state = {
  bearing: undefined,
  rawReport: undefined,
  distance: undefined,
  error: undefined,
  icao: undefined,
  isFailed: false,
  isFetching: false,
  updatedAt: undefined
},
action) => {
  switch(action.type) {
    case ACTION.ADD_METAR:
      return Object.assign({}, state, {
        icao: action.icao,
        distance: action.distance,
        bearing: action.bearing
      })
    case ACTION.REQUEST_METAR:
      if(state.icao === action.icao) {
        return Object.assign({}, state, {
          isFetching: true
        })
      }
      return state
    case ACTION.REQUEST_METAR_SUCCESS:
      if(state.icao === action.icao) {
        return Object.assign({}, state, {
          rawReport: action.data["Raw-Report"],
          isFailed: false,
          isFetching: false,
          updatedAt: action.updatedAt
        })
      }
      return state
    case ACTION.REQUEST_METAR_FAILURE:
      if(state.icao === action.icao) {
        return Object.assign({}, state, {
          error: action.error,
          isFailed: true,
          isFetching: false,
          updatedAt: action.updatedAt
        })
      }
      return state
    default:
      return state
  }
}

const metars = (state = [], action) => {
  switch(action.type) {
    case ACTION.ADD_METAR:
      return [
        ...state,
        metar(undefined, action)
      ]
    default:
      return state.map(rec => metar(rec, action))
  }
}

const rootReducer = combineReducers({
  location,
  metars
})

export default rootReducer
