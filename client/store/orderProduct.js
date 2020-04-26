import axios from 'axios'

/**
 * ACTION TYPES
 */
// const GET_PRODUCT = "GET_PRODUCT"
const GOT_ORDER_PRODUCT = 'GOT_ORDER_PRODUCT'
const UPDATED_ORDER_PRODUCT = 'UPDATED_ORDER_PRODUCT'
const CREATED_ORDER_PRODUCT = 'CREATED_ORDER_PRODUCT'

/**
 * ACTION CREATORS
 */

// const gotProduct = id => ({
//   type: GET_PRODUCT,
//   id
// })

const gotOrderProduct = orderProduct => ({
  type: GOT_ORDER_PRODUCT,
  orderProduct
})

const updatedOrderProduct = orderProduct => ({
  type: UPDATED_ORDER_PRODUCT,
  orderProduct
})

const createdOrderProduct = orderProduct => ({
  type: CREATED_ORDER_PRODUCT,
  orderProduct
})

/**
 * THUNK CREATORS
 */

// export const getProduct = () => async dispatch => {
//   try {
//     const {data} = await axios.get(`/api/products/`)
//     dispatch(gotProduct(data))
//   } catch (error) {
//     console.error(error)
//   }
// }

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
  quantity,
  totalPrice
) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/orderProducts/${productId}`, {
      quantity,
      totalPrice
    })
    dispatch(updatedOrderProduct(data))
  } catch (error) {
    console.error(error)
  }
}

export const createOrderProductDetails = (
  orderId,
  productId,
  quantity,
  totalPrice
) => async dispatch => {
  try {
    console.log(orderId, productId, quantity, totalPrice)
    const {data} = await axios.post(`/api/orderProducts/${productId}`, {
      orderId,
      productId,
      quantity,
      totalPrice
    })
    dispatch(createdOrderProduct(data))
  } catch (error) {
    console.log(error)
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
    case CREATED_ORDER_PRODUCT:
      return action.orderProduct ? action.orderProduct : {}
    default:
      return orderProduct
  }
}
