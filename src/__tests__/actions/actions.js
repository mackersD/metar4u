import * as actions from '../../actions/actions'
import * as CONSTANT from '../../util/constants'

describe('actions', () => {
  it('request geolocation', () => {
    const expectedAction = {
      type: CONSTANT.REQUEST_GEOLOCATION
    }
    expect(actions.requestGeolocation()).toEqual(expectedAction)
  })

  it('request geolocation success', () => {
    const lat = 30.00
    const long = -97.00
    const expectedAction = {
      type: CONSTANT.REQUEST_GEOLOCATION_SUCCESS,
      lat,
      long
    }
    expect(actions.requestGeolocationSuccess(lat, long)).toEqual(expectedAction)
  })

  it('request geolocation failure', () => {
    const err = "This is an error"
    const expectedAction = {
      type: CONSTANT.REQUEST_GEOLOCATION_FAILURE,
      err
    }
    expect(actions.requestGeolocationFailure(err)).toEqual(expectedAction)
  })

  it('add metar', () => {
    const options = {
      icao: 'KGTU',
      distance: 5,
      bearing: -10
    }
    const expectedAction = {
      type: CONSTANT.ADD_METAR,
      ...options
    }
    expect(actions.addMetar(options)).toEqual(expectedAction)
  })

  it('update metar station', () => {
    Date.now = jest.fn(() => 1482363367071)
    const icao = 'KGTU'
    const newStation = {
      icao: 'KAUS',
      distance: 5,
      bearing: -10
    }
    const expectedAction = {
      type: CONSTANT.UPDATE_METAR_STATION,
      icao,
      newIcao: newStation.icao,
      newDistance: newStation.distance,
      newBearing: newStation.bearing,
      updatedAt: Date.now()
    }
    expect(actions.updateMetarStation(icao, newStation)).toEqual(expectedAction)
  })

  it('request metar', () => {
    const icao = 'KGTU'
    const expectedAction = {
      type: CONSTANT.REQUEST_METAR,
      icao
    }
    expect(actions.requestMetar(icao)).toEqual(expectedAction)
  })

  it('request metar success', () => {
    Date.now = jest.fn(() => 1482363367071)
    const icao = 'KGTU'
    const data = {
      key1: 'value1',
      key2: 'value2'
    }
    const expectedAction = {
      type: CONSTANT.REQUEST_METAR_SUCCESS,
      data,
      icao,
      updatedAt: Date.now()
    }
    expect(actions.requestMetarSuccess(icao, data)).toEqual(expectedAction)
  })

  it('request metar failure', () => {
    Date.now = jest.fn(() => 1482363367071)
    const icao = 'KGTU'
    const error = 'This is an error'
    const expectedAction = {
      type: CONSTANT.REQUEST_METAR_FAILURE,
      error,
      icao,
      updatedAt: Date.now()
    }
    expect(actions.requestMetarFailure(icao, error)).toEqual(expectedAction)
  })

  it('update metars location', () => {
  })

  it('search geoname', () => {
  })

  it('search geoname result', () => {
  })
})
