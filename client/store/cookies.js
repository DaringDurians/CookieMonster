import axios from 'axios'

// Action Constants
const GOT_COOKIES = 'GOT_COOKIES'

// Action Creators
export const getCookies = cookies => ({
  type: GOT_COOKIES,
  cookies
})

// Thunk Creators
export const fetchAllCookies = () => {
  return async (dispatch, state) => {
    try {
      const res = await axios.get('/api/products/cookies')
      const cookies = res.data
      dispatch(getCookies(cookies))
    } catch (err) {
      console.error(err)
    }
  }
}

// Reducers
const cookies = (cookies = [], action) => {
  switch (action.type) {
    case GOT_COOKIES:
      return action.cookies
    default:
      return cookies
  }
}

export default cookies
