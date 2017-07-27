import React from 'react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import Metar from '../Metar'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Component - Metar', () => {
  it('renders', () => {
    const comp = renderer.create(
      <Provider store={mockStore({})}>
              <Metar />
      </Provider>
    ).toJSON()

    expect(comp).toMatchSnapshot()
  })
})
