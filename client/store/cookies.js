import axios from 'axios'

// Action Constants
const GOT_COOKIES = 'GOT_COOKIES'
const POST_COOKIE = 'POST_COOKIE'
const DELETE_COOKIE = 'DELETE_COOKIE'
// Action Creators
export const getCookies = cookies => ({
  type: GOT_COOKIES,
  cookies
})
export const postCookie = cookie => ({
  type: POST_COOKIE,
  cookie
})
export const deleteCookie = id => ({
  type: DELETE_COOKIE,
  id
})

// Thunk Creators
export const fetchAllCookies = () => {
  return async dispatch => {
    try {
      const res = await axios.get('/api/products/cookies')
      const cookies = res.data
      dispatch(getCookies(cookies))
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
      dispatch(postCookie(data))
    } catch (err) {
      console.log('ERROR posting cookies', err)
    }
  }
}
export const deleteProduct = id => {
  return async dispatch => {
    try {
      await axios.delete(`/api/products/${id}`)
      dispatch(deleteCookie(id))
    } catch (err) {
      console.log(err)
    }
  }
}

// Reducers
const cookies = (cookies = [], action) => {
  switch (action.type) {
    case GOT_COOKIES:
      return action.cookies.sort((a, b) => a.id - b.id)
    case POST_COOKIE:
      return [...cookies, action.cookie]
    case DELETE_COOKIE:
      return [
        ...cookies.filter(cookie => {
          return cookie.id !== action.id
        })
      ]
    default:
      return cookies
  }
}

export default cookies
