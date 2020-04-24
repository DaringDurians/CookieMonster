import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {products} from '.'
import {fetchOrderByUserId} from '../store/order'
import ProductsForm from './ProductsForm'

export class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  // ({handleClick, isLoggedIn}) => (

  render() {
    const {isLoggedIn} = this.props
    let totalItems = 0
    let totalPrice = 0
    return isLoggedIn ? (
      <div id="cartBox">
        <div>
          <p>Itemized Breakdown:</p>
        </div>
        <div id="itemizedSummary">
          {this.props.order.products
            ? this.props.order.products.length
              ? this.props.order.products.map(product => {
                  totalItems += product.orderProducts.quantity
                  totalPrice += product.orderProducts.quantity * product.price
                  return (
                    <ul key={product.id}>
                      <li>
                        {product.name} x {product.orderProducts.quantity} :{' '}
                        {'$' + (product.price / 100).toFixed(2)}{' '}
                      </li>
                    </ul>
                  )
                })
              : 'No items in cart'
            : 'No items in cart'}
        </div>
        {this.props.order.products ? (
          this.props.order.products.length ? (
            <div id="totalSummary">
              <div>
                <p>Total Items: {totalItems}</p>
              </div>
              <div>
                <p>Total Price: {'$' + (totalPrice / 100).toFixed(2)}</p>
              </div>
            </div>
          ) : (
            <div />
          )
        ) : (
          <div />
        )}
      </div>
    ) : (
      <div />
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: !!state.user.id,
  user: state.user,
  order: state.order
})

// const mapDispatchToProps = dispatch => ({
//   fetchOrderByUserId: id => dispatch(fetchOrderByUserId(id)),
// })

export default connect(mapStateToProps, null)(Cart)
