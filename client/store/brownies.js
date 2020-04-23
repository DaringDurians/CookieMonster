import axios from 'axios'

// Action Constants
const GOT_BROWNIES = 'GOT_BROWNIES'
const POST_BROWNIE = 'POST_BROWNIE'
const DELETE_BROWNIE = 'DELETE_BROWNIE'

// Action Creators
export const gotBrownies = brownies => ({
  type: GOT_BROWNIES,
  brownies
})
export const postBrownie = brownie => ({
  type: POST_BROWNIE,
  brownie
})
export const deleteBrownie = id => ({
  type: DELETE_BROWNIE,
  id
})

// Thunk Creators
export const fetchAllBrownies = () => {
  return async dispatch => {
    try {
      const res = await axios.get('/api/products/brownies')
      const brownies = res.data
      dispatch(gotBrownies(brownies))
    } catch (err) {
      console.error(err)
    }
  }
}
export const postProduct = (name, category, price, description, imgUrl) => {
  return async dispatch => {
    console.log(name, category, price, description, imgUrl)
    try {
      const {data} = await axios.post('/api/products', {
        name,
        category,
        price,
        description,
        imgUrl
      })
      dispatch(postBrownie(data))
    } catch (err) {
      console.log('ERROR posting brownies', err)
    }
  }
}
export const deleteProduct = id => {
  return async dispatch => {
    try {
      await axios.delete(`/api/products/${id}`)
      dispatch(deleteBrownie(id))
    } catch (err) {
      console.log(err)
    }
  }
}

// Reducers
const brownies = (brownies = [], action) => {
  switch (action.type) {
    case GOT_BROWNIES:
      return action.brownies
    case POST_BROWNIE:
      return [...brownies, action.brownie]
    case DELETE_BROWNIE:
      return [
        ...brownies.filter(brownie => {
          return brownie.id !== action.id
        })
      ]
    default:
      return brownies
  }
}

export default brownies
