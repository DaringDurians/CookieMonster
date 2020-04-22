import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

export class Cart extends Component {
  constructor() {
    super()
    this.state = ''
  }

  // ({handleClick, isLoggedIn}) => (
  render() {
    return (
      <div id="cartBox">
        <div id="orderSummary">
          {/* <!-- Will need to map over cookies in order for this section below --> */}
          <form>
            <label htmlFor="cookieQuantity">Quantity</label>
            {/* <!-- Will need to change value to cookie quantity figure from map function --> */}
            <input
              type="number"
              id="cookieQuantity"
              name="cookieQuantity"
              value="22"
            />
          </form>

          <div>
            <p>Cookie Name</p>
          </div>
          <div>
            <p>Cookie Price</p>
          </div>
        </div>

        <div id="orderTotal">
          <p>Order Total</p>
        </div>
        <div>
          <button type="submit" id="confirmButton" onClick="handlesubmit">
            Submit
          </button>
        </div>
      </div>
    )
  }
}

// const mapState = state => {
//   return {
//     isLoggedIn: !!state.user.id
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     handleClick() {
//       dispatch(logout())
//     }
//   }
// }
