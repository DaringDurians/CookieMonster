import axios from 'axios'
import {NavLink} from 'react-router-dom'

// Action Constants
const GOT_USERS = 'GOT_USERS'

// Action Creators
export const gotUsers = users => ({
  type: GOT_USERS,
  users
})

// Thunk Creators
export const fetchAllUsers = () => {
  return async (dispatch, state) => {
    try {
      const res = await axios.get('/api/users')
      const users = res.data
      dispatch(gotUsers(users))
    } catch (err) {
      console.error(err)
    }
  }
}

// Reducers
const users = (users = [], action) => {
  switch (action.type) {
    case GOT_USERS:
      return action.users
    default:
      return users
  }
}

export default users
