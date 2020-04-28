import axios from 'axios'

const GOT_BROWNIE = 'GOT_BROWNIE'
const UPDATE_BROWNIE = 'UPDATE_BROWNIE'

const gotBrownie = id => ({
  type: GOT_BROWNIE,
  id
})

const updateBrownie = id => ({
  type: UPDATE_BROWNIE,
  id
})

export const fetchBrownie = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/brownies/${id}`)
      dispatch(gotBrownie(data))
    } catch (err) {
      console.error('ERROR fetching brownie', err)
    }
  }
}

export const updatedBrownie = (
  id,
  name,
  category,
  price,
  description,
  imgUrl
) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/products/brownies/${id}`, {
        name,
        category,
        price,
        description,
        imgUrl
      })
      dispatch(updateBrownie(data))
    } catch (err) {
      console.error('ERROR updating brownie', err)
    }
  }
}

const initialState = []

const brownieReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_BROWNIE:
      return action.id
    case UPDATE_BROWNIE:
      return [action.id]
    default:
      return state
  }
}

export default brownieReducer
