import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers/reducers'

const loggerMiddleware = createLogger()

export default function configureStore(state) {
  return createStore(
    rootReducer,
    state,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
}
