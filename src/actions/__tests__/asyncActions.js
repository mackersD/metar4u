import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../actions'
import * as CONSTANT from '../../util/constants'
import nock from 'nock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('fetch metar - success', () => {
    Date.now = jest.fn(() => 1482363367071)
    const data = {
      "Altimeter": "3000",
      "Cloud-List": [],
      "Dewpoint": "21",
      "Flight-Rules": "VFR",
      "Other-List": [],
      "Raw-Report": "KGTU 100150Z 35004KT 10SM CLR 26/21 A3000",
      "Remarks": "",
      "Remarks-Info": {},
      "Runway-Vis-List": [],
      "Station": "KGTU",
      "Temperature": "26",
      "Time": "100150Z",
      "Units": {
        "Altimeter": "inHg",
        "Altitude": "ft",
        "Temperature": "C",
        "Visibility": "sm",
        "Wind-Speed": "kt"
      },
      "Visibility": "10",
      "Wind-Direction": "350",
      "Wind-Gust": "",
      "Wind-Speed": "04",
      "Wind-Variable-Dir": []
    }
    nock('http://avwx.rest/api/metar/KGTU')
      .get('')
      .reply(200, data)
    const expectedActions = [
      {
        type: CONSTANT.REQUEST_METAR,
        icao: 'KGTU'
      },
      {
        type: CONSTANT.REQUEST_METAR_SUCCESS,
        data,
        icao: 'KGTU',
        updatedAt: Date.now()
      }
    ]
    const store = mockStore({})

    return store.dispatch(actions.fetchMetar('KGTU'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('fetch metar - failure', () => {
    Date.now = jest.fn(() => 1482363367071)
    const data = {
      "Error": "Station Lookup Error: METAR not found for KGTU (1)"
    }
    nock('http://avwx.rest/api/metar/KGTU')
      .get('')
      .reply(200, data)
    const expectedActions = [
      {
        type: CONSTANT.REQUEST_METAR,
        icao: 'KGTU'
      },
      {
        type: CONSTANT.REQUEST_METAR_FAILURE,
        error: data.Error,
        icao: 'KGTU',
        updatedAt: Date.now()
      }
    ]
    const store = mockStore({})

    return store.dispatch(actions.fetchMetar('KGTU'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('fetch location - latlong success', () => {
    Date.now = jest.fn(() => 1482363367071)
    const opts = {
      lookup: {
        text: "40 -97"
      },
      lat: "40",
      long: "-97"
    }

    const expectedActions = [
      {
        type: CONSTANT.REQUEST_GEONAMES,
        lookup: opts.lookup
      },
      {
        type: CONSTANT.REQUEST_GEONAMES_SUCCESS,
        lat: opts.lat,
        long: opts.long,
        json: undefined
      },
      {
        type: CONSTANT.CHANGE_LOCATION,
        lat: opts.lat,
        long: opts.long,
        updatedAt: Date.now()
      }
    ]
    const store = mockStore({})

    store.dispatch(actions.fetchLocation(opts.lookup))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('fetch location - geoname success', () => {
    Date.now = jest.fn(() => 1482363367071)
    const opts = {
      lookup: {
        text: "KGTU"
      },
      lat: 30.67817,
      long: -97.67651
    }

    const geonameData = {
      "totalResultsCount": 1,
      "geonames": [
        {
          "adminCode1": "TX",
          "lng": "-97.67651",
          "geonameId": 4693351,
          "toponymName": "Georgetown Municipal Airport",
          "countryId": "6252001",
          "fcl": "S",
          "population": 0,
          "countryCode": "US",
          "name": "Georgetown Municipal Airport",
          "fclName": "spot, building, farm",
          "countryName": "United States",
          "fcodeName": "airport",
          "adminName1": "Texas",
          "lat": "30.67817",
          "fcode": "AIRP"
        }
      ]
    }

    nock('http://api.geonames.org/searchJSON?username=metar4u&q=KGTU')
      .get('')
      .reply(200, geonameData)

    const expectedActions = [
      {
        type: CONSTANT.REQUEST_GEONAMES,
        lookup: opts.lookup
      },
      {
        type: CONSTANT.REQUEST_GEONAMES_SUCCESS,
        lat: opts.lat,
        long: opts.long,
        json: undefined
      },
      {
        type: CONSTANT.CHANGE_LOCATION,
        lat: opts.lat,
        long: opts.long,
        updatedAt: Date.now()
      }
    ]

    const store = mockStore({})

    store.dispatch(actions.fetchLocation(opts.lookup))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('fetch location - geoname failure', () => {
    Date.now = jest.fn(() => 1482363367071)
    const opts = {
      lookup: {
        text: "KGTUUUU"
      },
      lat: 30.67817,
      long: -97.67651
    }

    const geonameData = {
      "totalResultsCount": 0,
      "geonames": []
    }

    nock('http://api.geonames.org/searchJSON?username=metar4u&q=KGTUUUU')
      .get('')
      .reply(200, geonameData)

    const expectedActions = [
      {
        type: CONSTANT.REQUEST_GEONAMES,
        lookup: opts.lookup
      },
      {
        type: CONSTANT.REQUEST_GEONAMES_FAILURE
      }
    ]

    const store = mockStore({})

    store.dispatch(actions.fetchLocation(opts.lookup))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
