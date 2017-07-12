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
})
