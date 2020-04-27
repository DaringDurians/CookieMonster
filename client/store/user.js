import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (name, email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {name, email, password})
    console.log(method)

    //take guest cart info (if it exists) and attach it to the user cart info upon login
    console.log('res.data upon initial load', res.data)
    let linkUser
    if (res.data.id) {
      linkUser = JSON.parse(window.sessionStorage.getItem(undefined))
      console.log(
        'what happens if user not logged in and nothign in cart',
        linkUser
      )
    }
    if (linkUser !== undefined && linkUser !== null) {
      window.sessionStorage.setItem(res.data.id, JSON.stringify(linkUser))
      window.sessionStorage.removeItem(undefined)
    }
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
