import axios from 'axios'

const GOT_BROWNIE = 'GOT_BROWNIE'

const gotBrownie = id => ({
  type: GOT_BROWNIE,
  id
})

export const fetchBrownie = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/brownies/${id}`)
      dispatch(gotBrownie(data))
    } catch (err) {
      console.log('ERROR fetching brownie', err)
    }
  }
}

const initialState = []

const brownieReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_BROWNIE:
      return action.id
    default:
      return state
  }
}

export default brownieReducer
