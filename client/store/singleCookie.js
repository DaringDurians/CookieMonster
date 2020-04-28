import axios from 'axios'

const GOT_COOKIE = 'GOT_COOKIE'
const UPDATE_COOKIE = 'UPDATE_COOKIE'

const gotCookie = id => ({
  type: GOT_COOKIE,
  id
})

const updateCookie = id => ({
  type: UPDATE_COOKIE,
  id
})

export const fetchCookie = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/cookies/${id}`)
      dispatch(gotCookie(data))
    } catch (err) {
      console.error('ERROR fetching cookie', err)
    }
  }
}

export const updatedCookie = (
  id,
  name,
  category,
  price,
  description,
  imgUrl
) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/products/cookies/${id}`, {
        name,
        category,
        price,
        description,
        imgUrl
      })
      dispatch(updateCookie(data))
    } catch (err) {
      console.error('ERROR updating cookie', err)
    }
  }
}

const initialState = []

const cookieReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_COOKIE:
      return action.id
    default:
      return state
  }
}

export default cookieReducer
