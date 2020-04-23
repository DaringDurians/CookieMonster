import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import users from './allUsers'
import singleCookie from './singleCookie'
import singleUser from './singleUser'
import singleBrownie from './singleBrownie'
import cookies from './cookies'
import brownies from './brownies'
import order from './order'

const reducer = combineReducers({
  users,
  user,
  order,
  cookies,
  brownies,
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
