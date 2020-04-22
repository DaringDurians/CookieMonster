import axios from 'axios'

const GOT_COOKIE = 'GOT_COOKIE'

const gotCookie = id => ({
  type: GOT_COOKIE,
  id
})

export const fetchCookie = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/cookies/${id}`)
      dispatch(gotCookie(data))
    } catch (err) {
      console.log('ERROR fetching cookie', err)
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
