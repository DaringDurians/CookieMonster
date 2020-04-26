import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_ORDER = 'GOT_ORDER'
const POST_ORDER = 'POST_ORDER'

/**
 * ACTION CREATORS
 */
const gotOrder = order => ({type: GOT_ORDER, order})
const postOrder = order => ({type: POST_ORDER, order})

/**
 * THUNK CREATORS
 */

export const fetchOrderByUserId = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/order/${userId}`)
    console.log(data)
    dispatch(gotOrder(data))
  } catch (error) {
    console.error(error)
  }
}

export const sendCart = (userId, active, total) => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/order', {userId, active, total})
      dispatch(postOrder(data))
    } catch (err) {
      console.log('ERROR posting cart', err)
    }
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
