import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import Metar4uApp from './Metar4uApp'

const store = configureStore()

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Metar4uApp />
      </Provider>
    )
  }
}
