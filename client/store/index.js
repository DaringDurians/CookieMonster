import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import singleCookie from './singleCookie'
import singleUser from './singleUser'
import singleBrownie from './singleBrownie'

const reducer = combineReducers({
  user,
  singleCookie,
  singleUser,
  singleBrownie
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './singleCookie'
