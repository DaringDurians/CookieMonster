/* eslint-disable complexity */
import axios from 'axios'
import history from '../history'
import {productsInfo} from '../components/Quantity.js'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

// eslint-disable-next-line max-statements
export const auth = (name, email, password, method) => async dispatch => {
  let res,
    productId = 2,
    quantity = 0,
    totalPrice = 0,
    exist
  try {
    res = await axios.post(`/auth/${method}`, {name, email, password})

    let userId = res.data.id
    exist = await axios.post(`/api/order/`, {
      userId,
      productId,
      quantity,
      totalPrice
    })
    console.log('EXIST IN LOGIN', exist.data)
    // activeExist = if(exist.data.active
    const products = await axios.get('/api/products/')

    if (Array.isArray(exist.data)) {
      console.log('Entered first if ')
      let mapExist = exist.data.map(product => {
        let tempProd = {
          prodId: product.productId,
          name: products.data[product.productId].name,
          imgUrl: products.data[product.productId].imgUrl,
          active: true,
          quantity: product.quantity,
          price: product.totalPrice
        }
        return tempProd
      })
      console.log('MAP EXIST', mapExist)
      const temp = JSON.parse(window.sessionStorage.getItem(undefined))

      window.sessionStorage.removeItem(undefined)
      if (temp !== null) {
        const updatedSession = [...mapExist, ...temp]
        window.sessionStorage.setItem(userId, JSON.stringify(updatedSession))
      } else {
        window.sessionStorage.setItem(userId, JSON.stringify([...mapExist]))
      }
    } else if (res.data.id) {
      console.log('Entered first else if ')
      let linkUser
      linkUser = JSON.parse(window.sessionStorage.getItem(undefined))
      if (linkUser !== undefined && linkUser !== null) {
        // console.log(linkUser)
        window.sessionStorage.removeItem(undefined)
        // need to merge db cart upon login before setting sessions cart to user key
        window.sessionStorage.setItem(res.data.id, JSON.stringify(linkUser))
        const orderId = await axios.get(`/api/order/${res.data.id}`)
        console.log('****************', linkUser)
        const mapUser = Promise.all(
          linkUser.map(product => {
            let tempProd = {
              orderId: orderId.data[0].id,
              productId: product.prodId,
              quantity: product.quantity,
              totalPrice: product.price
            }
            console.log('tempProd', tempProd)
            axios.post(`/api/orderProducts/${product.prodId}`, tempProd)
          })
        )
      }
      //
      console.log('res.data upon initial load', res.data)
    } else if (exist.data.id !== undefined || exist.data.id !== null) {
      console.log('Entered second else if ')
      console.log('EXIST>DATA>ID', exist.data.id)
      const getDbCart = await axios.get(`/api/orderProducts/${exist.data.id}`)
      const dbOrder = getDbCart.data[0]
      console.log('PRODUCTS', products.data)
      console.log(getDbCart.data[0], 'GET DB CART')
      if (dbOrder.quantity !== 0) {
        const tempProd = {
          prodId: dbOrder.productId,
          name: products.data[dbOrder.productId].name,
          imgUrl: products.data[dbOrder.productId].imgUrl,
          active: true,
          quantity: dbOrder.quantity,
          price: dbOrder.totalPrice
        }
        console.log(tempProd, 'TO BE SENT TO SESSIONS')
        window.sessionStorage.setItem(userId, JSON.stringify(tempProd))
      }
    }
    //take guest cart info (if it exists) and attach it to the user cart info upon login
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
    window.sessionStorage.clear()
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
