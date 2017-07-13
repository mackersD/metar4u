import * as actions from '../../actions/actions'
import * as CONSTANT from '../../util/constants'

describe('actions', () => {
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

  it('request geonames', () => {
    const lookup = {
      lat: 0,
      long: 0,
      text: "Dallas, TX"
    }
    const expectedAction = {
      type: CONSTANT.REQUEST_GEONAMES,
      lookup
    }
    expect(actions.requestGeonames(lookup)).toEqual(expectedAction)
  })

  it('reqeust geonames success', () => {
    var lat = 0
    var long = 0
    var json = {}
    const expectedAction = {
      type: CONSTANT.REQUEST_GEONAMES_SUCCESS,
      lat,
      long,
      json
    }
    expect(actions.requestGeonamesSuccess(lat, long, json)).toEqual(expectedAction)
  })

  it('request geonames failure', () => {
    const expectedAction = {
      type: CONSTANT.REQUEST_GEONAMES_FAILURE
    }
    expect(actions.requestGeonamesFailure()).toEqual(expectedAction)
  })
})
