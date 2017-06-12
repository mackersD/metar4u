import {
  REQUEST_WEATHER,
  REQUEST_WEATHER_SUCCESS,
  REQUEST_WEATHER_FAILURE,
  REQUEST_GEOLOCATION,
  REQUEST_GEOLOCATION_SUCCESS,
  REQUEST_GEOLOCATION_FAILURE} from '../util/constants'

const initialState = {
  lat: 0.0,
  long: 0.0,
  isFetching: false,
  metars: []
}

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case REQUEST_WEATHER:
      return Object.assign({}, state, {
        isFetching: true
      })
    case REQUEST_WEATHER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        metars: [action.data]
      })
    case REQUEST_WEATHER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })
    case REQUEST_GEOLOCATION_SUCCESS:
      return Object.assign({}, state, {
        lat: action.lat,
        long: action.long
      })
    case REQUEST_GEOLOCATION:
    case REQUEST_GEOLOCATION_FAILURE:
    default:
      return state
  }
}

export default rootReducer
