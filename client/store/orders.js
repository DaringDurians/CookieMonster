import axios from 'axios'

/**
 * ACTION TYPES
 */

const GOT_OLD_ORDERS = 'GOT_OLD_ORDERS'

/**
 * ACTION CREATORS
 */

const gotOldOrders = orders => ({type: GOT_OLD_ORDERS, orders})

/**
 * THUNK CREATORS
 */

export const fetchAllOrderHistory = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/order`)
    const orders = data.filter(order => order.active === false)
    dispatch(gotOldOrders(orders))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */

export default function(orders = [], action) {
  switch (action.type) {
    case GOT_OLD_ORDERS:
      return action.orders
    default:
      return orders
  }
}
