import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_ORDER = 'GOT_ORDER'
const POST_ORDER = 'POST_ORDER'
const UPDATE_ORDER = 'UPDATE_ORDER'

/**
 * ACTION CREATORS
 */
const gotOrder = order => ({type: GOT_ORDER, order})
const postOrder = order => ({type: POST_ORDER, order})
const updateOrder = order => ({type: UPDATE_ORDER, order})

/**
 * THUNK CREATORS
 */

export const fetchOrderByUserId = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/order/${userId}`)
    dispatch(gotOrder(data))
  } catch (error) {
    console.error(error)
  }
}

export const sendCart = (userId, active, total) => {
  return async dispatch => {
    try {
      const getOrder = await axios.get(`/api/order/${userId}`)
      console.log(
        'getORder deatils for existign users in DB',
        getOrder.data[0].id
      )
      if (getOrder.data.length === 0) {
        const {data} = await axios.post('/api/order', {userId, active, total})
        dispatch(postOrder(data))
      } else {
        // const {data} = await axios.get(`api/orderProducts/${getOrder.data[0].id}`)
        // dispatch()
        //following is just to make sure thigns dont break(needs update)
        const {data} = await axios.post('/api/order', {userId, active, total})
        dispatch(postOrder(data))

        // const {data} = await axios.put(`api/order/${getOrder.data.id}`, {userId, active, total})
        // console.log('put route in send cart thunk data retreived', data[0].id)
        // dispatch(updateOrder(data[0]))
        //   const {getOrderDetails} = await axios.get(`/api/orderProduct/${getOrder.data.id}`)
        // dispatch(())
      }
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
    case UPDATE_ORDER:
      return action.order
    default:
      return order
  }
}
