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

const getItemsHelper = userId => {
  const temp = JSON.parse(window.sessionStorage.getItem(userId))
  return temp
}
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

// export const fetchOrderProductDetails = productId => async dispatch => {
//   try {
//     const {data} = await axios.get(`/api/orderProducts/${productId}`)
//     dispatch(gotOrderProduct(data))
//   } catch (error) {
//     console.error(error)
//   }
// }

export const updateOrderProductDetails = (
  prodId,
  quantity,
  price,
  userId,
  name,
  imgUrl,
  active
) => async dispatch => {
  try {
    // const {data} = await axios.put(`/api/orderProducts/${productId}`, {
    //   quantity,
    //   totalPrice
    // })
    if (quantity !== 0) {
      let tempProduct = {prodId, name, imgUrl, active, quantity, price}
      const items = getItemsHelper(userId)
      let allProducts

      if (items !== null) {
        const found = items.find(product => product.prodId === prodId)
        if (found) {
          const updateProduct = items
            .map(product => {
              if (product.prodId === prodId) {
                product.quantity = quantity
                product.price = price
                return product
              } else {
                return product
              }
            })
            .filter(product => product.quantity !== 0)
          allProducts = updateProduct
        } else if (quantity !== 0) {
          allProducts = [...items, tempProduct]
        } else {
          allProducts = [...items]
        }
      } else if (quantity !== 0) {
        allProducts = [tempProduct]
      }
      window.sessionStorage.setItem(userId, JSON.stringify(allProducts))
      console.log('before dispatch in updated orderproduct thunk', allProducts)
      dispatch(updatedOrderProduct(tempProduct))
      console.log(
        'after dispatch in updated orderproduct thunk',
        allProducts[0]
      )
    }
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
