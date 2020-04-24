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
const gotOrder = order => ({type: GOT_ORDER, order})

/**
 * THUNK CREATORS
 */

export const fetchOrderByUserId = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/order/${userId}`)
    dispatch(gotOrder(data[0]))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export default function(order = {}, action) {
  switch (action.type) {
    case GOT_ORDER:
      return action.order ? action.order : {}
    default:
      return order
  }
}
