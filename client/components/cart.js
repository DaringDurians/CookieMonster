import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
// import {products} from './'
import {fetchOrder} from '../store/order'
import {Quantity} from './Quantity'

export class Cart extends Component {
  constructor() {
    super()
    this.state = ''
    // this.handleQuantity = this.handleQuantity.bind(this)
  }

  componentDidMount() {
    this.props.fetchOrder(1)
  }

  // handleQuantity(event) {
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   })
  // }

  // ({handleClick, isLoggedIn}) => (
  render() {
    console.log('********************', this.props)
    //orderid = 1
    return (
      <div id="cartBox">
        <div id="orderSummary">
          <h3>Order Summary:</h3>
          {/* <!-- Will need to map over cookies in order for this section below --> */}
          {/* get the order.id to map over the orderProducts table in the database if user is logged in to retrieve past cart
                we can get logged in user id --> ORDERS TABLE order.id (active) --> ORDERPRODUCTS TABLE map for each product.id based on order.id and get quantity & price= 
                                         5                       1                              1=chocloatechip                                              Q=2      p=2*PRICE OF EACH
                if Guest retrive data from local storage based on order id
                  */}
          <div>
            <Quantity />
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
          {/* <button type="submit" id="confirmButton" onClick="handlesubmit">
            Submit
          </button> */}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    order: state.order
  }
}

const mapDispatch = dispatch => {
  return {
    fetchOrder: orderId => dispatch(fetchOrder(1))
  }
}

export default connect(mapState, mapDispatch)(Cart)
