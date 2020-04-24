import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {products} from '.'
import {fetchOrder} from '../store/order'
import {Quantity} from './Quantity'
export class Cart extends Component {
  constructor() {
    super()
    this.state = ''
  }

  componentDidMount() {
    this.props.fetchOrder(5)
  }

  // ({handleClick, isLoggedIn}) => (
  render() {
    console.log('this.props.order in Cart render', this.props.order)
    return (
      <div id="cartBox">
        <div id="orderSummary">
          <h3>Order Summary:</h3>
          {/* If logged in ---> find user.id  ----> find order.id for active orders   ----> map on proderProducts for the order.id and render quantity, price, name, img
              if not logged in ----> check if local storage exists  ----> retrive cart
                                      if local storage is empty --------> check if cookies exists ------> use the cookies to store actions
                                                                          if no cookies exist ----------> set new cookies and then track store actions
          to={`/${item.category}/${item.id}`}
          */}
          <ul>
            {this.props.order.map(order => (
              <ul key={order.id}>
                <span>Quantity-------></span>
                <span>Item---------></span>
                <span>Amount</span>
                {order.products.map(product => (
                  <ul key={product.id}>
                    {product.orderProducts.quantity}
                    <Quantity quantity={product.orderProducts.quantity} />
                    <Link to={`/${product.category}/${product.id}`}>
                      {product.name}
                    </Link>---->
                    {product.orderProducts.totalPrice / 100}
                  </ul>
                ))}
              </ul>
            ))}
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
  fetchOrder: userId => dispatch(fetchOrder(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

//SEEEEEEEEEEEEEEED ADD

// const [sampleOrderProduct2] = await Promise.all([
//     OrderProducts.create({
//       orderId: sampleOrder.id,
//       productId: sugar.id,
//       quantity: 1,
//       totalPrice: chocolateChip.price
//     })
//   ])

/////ALSO CHANGE REDUCER AND ACTION AND THUNK FOR USERID!
///CHANGE PRODUCT FORMS for brownies and cookies
////ensure seed is changes with brownies and cookies
