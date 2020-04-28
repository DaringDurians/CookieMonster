import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_ORDER = 'GOT_ORDER'
const POST_ORDER = 'POST_ORDER'
const UPDATE_ORDER = 'UPDATE_ORDER'
const CHECKOUT_ORDER = 'CHECKOUT_ORDER'

/**
 * ACTION CREATORS
 */
const gotOrder = order => ({type: GOT_ORDER, order})
const postOrder = order => ({type: POST_ORDER, order})
const updateOrder = order => ({type: UPDATE_ORDER, order})
const checkoutOrder = order => ({type: CHECKOUT_ORDER, order})

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

export const sendCart = (userId, active, total, name, email) => {
  return async dispatch => {
    try {
      if (userId === undefined) {
        console.log('INSIDE SEND CART THUNBKKKK', name, email, userId)
        const guestUser = await axios.post(`/api/users`, {
          name: name,
          email: email
        })
        // userId = guestUser.id
        const guestOrder = await axios.post(`/api/order`, {
          userId: guestUser.data.id,
          productId: 1,
          quantity: 0,
          totalPrice: 0
        })
        const guestSessions = JSON.parse(
          window.sessionStorage.getItem(undefined)
        )
        console.log('GUEST ORDER', guestOrder)
        let mappedGS = Promise.all(
          guestSessions.map(item => {
            let newProduct = {
              orderId: guestOrder.data.id,
              productId: item.prodId,
              quantity: item.quantity,
              totalPrice: item.price
            }
            console.log(newProduct)
            axios.post(`api/orderProducts/${item.prodId}`, newProduct)
          })
        )
        await axios.put(`api/order/${guestOrder.data.id}`, {active: false})
        console.log('PUT ROUTE RAN')
      } else {
        console.log('LOGGEDINORDER')
        const loggedInOrder = await axios.get(`api/order/${userId}`)
        console.log(loggedInOrder)
        await axios.put(`api/order/${loggedInOrder.data[0].id}`, {
          active: false
        })
      }

      // const getOrder = await axios.get(`/api/order/${userId}`)
      // console.log(
      //   'getORder deatils for existign users in DB',
      //   getOrder.data[0].id
      // )
      // if (getOrder.data.length === 0) {
      // const {data} = await axios.post('/api/order', {userId, active, total})
      // dispatch(postOrder(data))
      // } else {
      // const {data} = await axios.get(`api/orderProducts/${getOrder.data[0].id}`)
      // dispatch()
      //following is just to make sure thigns dont break(needs update)
      // const {data} = await axios.post('/api/order', {userId, active, total})
      // dispatch(postOrder(data))

      // const {data} = await axios.put(`api/order/${getOrder.data.id}`, {userId, active, total})
      // console.log('put route in send cart thunk data retreived', data[0].id)
      // dispatch(updateOrder(data[0]))
      //   const {getOrderDetails} = await axios.get(`/api/orderProduct/${getOrder.data.id}`)
      // dispatch(())
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
