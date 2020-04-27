import React from 'react'
import axios from 'axios'
import {NavLink} from 'react-router-dom'

let name, email
export class CheckoutForm extends React.Component {
  async createGuest() {
    event.preventDefault()
    name = event.target.fullname.value
    email = event.target.email.value
    const {data} = await axios.post(`/api/user/`, {name, email})
  }
  render() {
    return (
      <div>
        <h3>Don't be a stranger!</h3>
        <p>Sign up to check out</p>
        <NavLink to="/login">Log In</NavLink>
        <br />
        <NavLink to="/signup">Sign Up</NavLink>
        <br />
        <h3>Or if you want to stay as guest...</h3>
        <form>
          <div>
            <label htmlFor="fullname">
              <small>Name</small>
            </label>
            <input name="fullname" type="text" />
          </div>
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </div>
          <div>
            <button type="submit">Checkout as Guest</button>
          </div>
        </form>
      </div>
    )
  }
}
