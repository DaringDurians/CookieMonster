import axios from 'axios'

const SET_QUANTITY = 'SET_QUANTITY'
const GET_QUANTITY = 'GET_QUANTITY'

const setQuantity = quantity => ({
  type: SET_QUANTITY,
  quantity
})

const getQuantity = quantity => ({
  type: GET_QUANTITY,
  quantity
})

export const setQuantityThunk = quantity => {
  return async dispatch => {
    try {
      dispatch(setQuantity(quantity))
    } catch (err) {
      console.log('ERROR fetching brownie', err)
    }
  }
}

export const getQuantityThunk = (prodId, productList) => {
  return async dispatch => {
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
      console.log('ERROR fetching brownie', err)
    }
  }
}

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
