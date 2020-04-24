import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {products} from '.'
import {fetchOrder} from '../store/order'
export class Cart extends Component {
  constructor() {
    super()
    this.state = ''
  }

  componentDidMount() {
    this.props.fetchOrder(1)
  }

  // ({handleClick, isLoggedIn}) => (
  render() {
    console.log(JSON.parse(window.sessionStorage.getItem('cart')))
    console.log('********************', this.props.order)
    //orderid = 1
    return (
      <div id="cartBox">
        <div id="orderSummary">
          <h3>Order Summary:</h3>
          {/* If logged in ---> find user.id  ----> find order.id for active orders   ----> map on proderProducts for the order.id and render quantity, price, name, img
              if not logged in ----> check if local storage exists  ----> retrive cart
                                      if local storage is empty --------> check if cookies exists ------> use the cookies to store actions
                                                                          if no cookies exist ----------> set new cookies and then track store actions*/}
          <ul>
            {/* {this.props.order.products.map(product => (
              <li key={product.id}>
                <Link to={`/${product.catorgory}/${product.id}`}>{product.name} {product.imgUrl} key={product.id}</Link>
              </li>
            ))} */}
          </ul>
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

const mapStateToProps = state => ({
  order: state.order
})

const mapDispatchToProps = dispatch => ({
  fetchOrder: id => dispatch(fetchOrder(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

{
  /* <div>
                    <h4>Cookie Quantity</h4>
                  </div>
                  <div>
                    <h4>{Cookie Name}</h4>
                  </div>
                  <div>
                    <h4>Cookie Price</h4>
                  </div>
                  <div id="orderTotal">
                    <h4>Order Total</h4>
                  </div> */
}
