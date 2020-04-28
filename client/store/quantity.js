import axios from 'axios'

const SET_QUANTITY = 'SET_QUANTITY'
const GET_QUANTITY = 'GET_QUANTITY'
const GET_STORAGE = 'GET_STORAGE'
const UPDATE_STORAGE = 'UPDATE_STORAGE'

const setQuantity = quantity => ({
  type: SET_QUANTITY,
  quantity
})

const getQuantity = quantity => ({
  type: GET_QUANTITY,
  quantity
})

const getStorage = userId => ({
  type: GET_STORAGE,
  userId
})

const updateStorage = (
  userId,
  active,
  orderId,
  productId,
  productImage,
  productName,
  productCategory,
  productQuantity,
  productPrice
) => ({
  type: UPDATE_STORAGE,
  active,
  productId,
  productImage,
  productName,
  productQuantity,
  productPrice,
  productCategory,
  userId,
  orderId
})

export const setQuantityThunk = quantity => {
  return async dispatch => {
    try {
      dispatch(setQuantity(quantity))
    } catch (err) {
      console.error('ERROR fetching Quantity', err)
    }
  }
}

export const getQuantityThunk = (prodId, productList) => {
  return dispatch => {
    try {
      if (productList) {
        if (
          productList.length &&
          productList.find(prodObj => prodObj.prodId === prodId)
        ) {
          const quantity = productList.find(
            prodObj => prodObj.prodId === prodId
          ).quantity
          dispatch(getQuantity(quantity))
        }
      } else {
        dispatch(getQuantity(0))
      }
    } catch (err) {
      console.error('ERROR fetching quantity', err)
    }
  }
}

// export const gotStorage = (userId) => {
//   return dispatch => {
//     try {
//       const temp = JSON.parse(window.sessionStorage.getItem(userId))
//       //dispatch(getStorage(temp))
//     } catch (err) {
//       console.log('ERROR fetching storage data', err)
//     }
//   }
// }

// export const updatedStorage = (userId, active, orderId, productId, productImage, productName, productCategory, productQuantity, productPrice) => {
//   return dispatch => {
//     try {
//       let prod = {
//         active: true
//         orderId: ,
//         productId:
//         productImage,
//         productName,
//         productCategory,
//         productQuantity,
//         productPrice
//       const {update} = JSON.parse(window.sessionStorage.getItem(userId))
//     } catch (err) {
//       console.log('ERROR fetching storage data', err)
//     }
//   }
// }

const quantity = (quantity = 0, action) => {
  switch (action.type) {
    case SET_QUANTITY:
      return action.quantity
    case GET_QUANTITY:
      return action.quantity
    default:
      return quantity
  }
}

export default quantity
