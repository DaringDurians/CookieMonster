import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_ORDER = 'GOT_ORDER'

/**
 * INITIAL STATE
 */
// const initalOrder = {
//   products: [],
//   loading: true
// }

/**
 * ACTION CREATORS
 */
const gotOrder = userId => ({type: GOT_ORDER, userId})

/**
 * THUNK CREATORS
 */

export const fetchOrder = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orderProducts/${userId}`)
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
      return action.orderId
    default:
      return order
  }
}
