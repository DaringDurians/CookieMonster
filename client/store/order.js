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
const gotOrder = order => ({type: GOT_ORDER, order})

/**
 * THUNK CREATORS
 */

export const order = orderId => async dispatch => {
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
export default function(state = initalOrder, action) {
  switch (action.type) {
    case GOT_ORDER:
      return {products: action.order, loading: false}
    default:
      return state
  }
}
