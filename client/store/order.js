import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_ORDER = 'GOT_ORDER'

/**
 * INITIAL STATE
 */
const initalOrder = {
  products: [],
  loading: true
}

/**
 * ACTION CREATORS
 */
const gotOrder = orderId => ({type: GOT_ORDER, orderId})

/**
 * THUNK CREATORS
 */

export const fetchOrder = orderId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orderProducts/${orderId}`)
    console.log('data from order thunk', data)
    dispatch(gotOrder(data))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export default function(order = [], action) {
  switch (action.type) {
    case GOT_ORDER:
      return {products: action.order, loading: false}
    default:
      return order
  }
}
