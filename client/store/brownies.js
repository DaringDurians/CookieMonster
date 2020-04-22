import axios from 'axios'

// Action Constants
const GOT_BROWNIES = 'GOT_BROWNIES'

// Action Creators
export const gotBrownies = brownies => ({
  type: GOT_BROWNIES,
  brownies
})

// Thunk Creators
export const fetchAllBrownies = () => {
  return async (dispatch, state) => {
    try {
      const res = await axios.get('/api/products/brownies')
      const brownies = res.data
      dispatch(gotBrownies(brownies))
    } catch (err) {
      console.error(err)
    }
  }
}

// Reducers
const brownies = (brownies = [], action) => {
  switch (action.type) {
    case GOT_BROWNIES:
      return action.brownies
    default:
      return brownies
  }
}

export default brownies
