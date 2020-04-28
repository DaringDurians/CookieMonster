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
import orders from './orders'
import orderProduct from './orderProduct'

const reducer = combineReducers({
  users,
  user,
  orders,
  order,
  orderProduct,
  cookies,
  brownies,
  singleCookie,
  singleUser,
  singleBrownie
})

let middleware
if (process.env.NODE_ENV !== 'production') {
  middleware = composeWithDevTools(
    applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
  )
} else {
  middleware = composeWithDevTools(applyMiddleware(thunkMiddleware))
}

const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './singleCookie'
