import * as ACTION from '../util/constants'
import { combineForms } from 'react-redux-form'
import { combineReducers } from 'redux'
import { getNearestStations } from '../util/stations'

const defaultLookup = {
  text: undefined
}

const defaultMetarState = {
  bearing: undefined,
  distance: undefined,
  error: undefined,
  icao: undefined,
  isFailed: false,
  isFetching: false,
  rawReport: undefined,
  updatedAt: undefined
}

const metarList = (state = {
  initialCount: 10,
  lat: undefined,
  long: undefined,
  metars: [],
  nearestStations: [],
  updatedAt: undefined
}, action) => {
  switch(action.type) {
    case ACTION.CHANGE_LOCATION:
      var nearestStations = getNearestStations(action.lat, action.long)
      var nearestMetars = nearestStations.slice(0, state.initialCount)
      return Object.assign({}, state, {
        lat: action.lat,
        long: action.long,
        metars: nearestMetars.map(rec => Object.assign({}, defaultMetarState, rec)),
        nearestStations,
        updatedAt: action.updatedAt
        })
    default:
      return Object.assign({}, state, {
        metars: state.metars.map(rec => metar(rec, action))
      })
  }
}

const metar = (state = defaultMetarState, action) => {
  switch(action.type) {
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

const rootReducer = combineReducers({
  metarList,
  deep: combineForms({
    lookup: defaultLookup
  }, 'deep')
})

export default rootReducer
