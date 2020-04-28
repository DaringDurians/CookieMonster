import axios from 'axios'

const GOT_USER = 'GOT_USER'

const gotUser = id => ({
  type: GOT_USER,
  id
})

export const fetchUser = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${id}`)
      dispatch(gotUser(data))
    } catch (err) {
      console.error('ERROR fetching user', err)
    }
  }
}

const initialState = []

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USER:
      return action.id
    default:
      return state
  }
}

export default userReducer
