import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_ORDER_PRODUCT = 'GOT_ORDER_PRODUCT'
const UPDATED_ORDER_PRODUCT = 'UPDATED_ORDER_PRODUCT'

/**
 * ACTION CREATORS
 */
const gotOrderProduct = orderProduct => ({
  type: GOT_ORDER_PRODUCT,
  orderProduct
})

const updatedOrderProduct = orderProduct => ({
  type: UPDATED_ORDER_PRODUCT,
  orderProduct
})

/**
 * THUNK CREATORS
 */

export const fetchOrderProductDetails = productId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orderProducts/${productId}`)
    dispatch(gotOrderProduct(data))
  } catch (error) {
    console.error(error)
  }
}

export const updateOrderProductDetails = (
  productId,
  quantity
) => async dispatch => {
  try {
    console.log(quantity)
    const {data} = await axios.put(`/api/orderProducts/${productId}`, {
      quantity: quantity
    })
    console.log(data)
    dispatch(updatedOrderProduct(data))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export default function(orderProduct = {}, action) {
  switch (action.type) {
    case GOT_ORDER_PRODUCT:
      return action.orderProduct ? action.orderProduct : {}
    case UPDATED_ORDER_PRODUCT:
      return action.orderProduct ? action.orderProduct : {}
    default:
      return orderProduct
  }
}
