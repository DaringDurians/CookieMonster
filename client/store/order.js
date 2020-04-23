import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_ORDER = 'GOT_ORDER'

/**
 * INITIAL STATE
 */
const initalOrder = []

/**
 * ACTION CREATORS
 */
const gotOrder = orderId => ({
  type: GOT_ORDER,
  orderId
})

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
export default function(state = initalOrder, action) {
  switch (action.type) {
    case GOT_ORDER:
      return action.order
    default:
      return state
  }
}
