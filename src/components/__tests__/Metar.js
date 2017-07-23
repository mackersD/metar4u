import React from 'react'
import Provider from 'react-redux'
import renderer from 'react-test-renderer'
import ReactDOM from 'react-dom'
import Metar from '../Metar'

const fakeStore = (state) => {
  return {
    default: () => {},
    subscribe: () => {},
    dispatch: () => {},
    getState: () => { return Object.assign({},state) }
  }
}

describe('Component - Metar', () => {
  it('renders', () => {
    const comp = renderer.create(
      <Metar store={fakeStore({})} />
    ).toJSON()

    expect(comp).toMatchSnapshot()
  })
})
