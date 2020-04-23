import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {products} from './'
export class Cart extends Component {
  constructor() {
    super()
    this.state = ''
    this.handleQuantity = this.handleQuantity.bind(this)
  }

  handleQuantity(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // ({handleClick, isLoggedIn}) => (
  render() {
    console.log('********************', this.props)
    //orderid = 1
    return (
      <div id="cartBox">
        <div id="orderSummary">
          <h3>Order Summary:</h3>
          {/* <!-- Will need to map over cookies in order for this section below --> */}
          <div>
            <h4>Cookie Quantity</h4>
          </div>

          <div>
            <h4>Cookie Name</h4>
          </div>

          <div>
            <h4>Cookie Price</h4>
          </div>
        </div>

        <div id="orderTotal">
          <h4>Order Total</h4>
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
