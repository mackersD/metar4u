import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../actions/actions'
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

})
