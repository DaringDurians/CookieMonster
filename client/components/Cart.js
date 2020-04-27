import React, {Component} from 'react'
import axios from 'axios'
import Quantity from './Quantity'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {sendCart, fetchOrderByUserId} from '../store/order.js'
import {createOrderProductDetails} from '../store/orderProduct'

let userId
let active
let total
let orderId
let prodId
let quantity
let price
let allProducts
export class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }

    this.forceUpdateHandler = this.forceUpdateHandler.bind(this)
  }

  forceUpdateHandler() {
    this.forceUpdate()
  }

  async handleCheckout(totalPrice) {
    userId = this.props.user.id
    active = false
    total = totalPrice
    await this.props.sendCart(userId, active, total)
    const {data} = await axios.get(`/api/order/${userId}`)
    orderId = data[0].id
    allProducts.map(product => {
      prodId = product.prodId
      quantity = product.quantity
      price = product.price
      this.props.createOrderProductDetails(orderId, prodId, quantity, price)
    })
  }

  render() {
    allProducts = JSON.parse(window.sessionStorage.getItem(this.props.userId))

    console.log('values>>>>>>>>>>>>>', allProducts)
    // const {isLoggedIn} = this.props

    let totalItems = 0
    let totalPrice = 0
    return (
      <div id="cartBox">
        <div>
          <p>Cart Contents:</p>
        </div>
        <div id="itemizedSummary">
          {allProducts
            ? allProducts.length
              ? allProducts.map(product => {
                  totalItems += product.quantity
                  totalPrice += product.price
                  return (
                    <ul key={product.prodId}>
                      <div className="smallImg">
                        <img src={product.imgUrl} /> {product.name} x{' '}
                        {product.quantity}
                        <Quantity
                          quantity={product.quantity}
                          prodId={product.prodId}
                          price={product.price / product.quantity}
                          onRender={() => {
                            this.setState({loaded: true})
                          }}
                        />{' '}
                        : {'$' + (product.price / 100).toFixed(2)}{' '}
                      </div>
                    </ul>
                  )
                })
              : 'No items in cart'
            : 'No items in cart'}
        </div>
        {allProducts ? (
          allProducts ? (
            <div id="totalSummary">
              <div>
                <p>Total Items: {totalItems}</p>
              </div>
              <div>
                <p>Total Price: {'$' + (totalPrice / 100).toFixed(2)}</p>
              </div>
              <div>
                {userId === undefined ? (
                  <NavLink to="/checkout">
                    <button type="button" name="checkout">
                      Checkout
                    </button>
                  </NavLink>
                ) : (
                  <button
                    type="button"
                    name="checkout"
                    onClick={() => this.handleCheckout(totalPrice)}
                  >
                    Place Order
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div />
          )
        ) : (
          <div />
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: !!state.user.id,
  user: state.user,
  order: state.order,
  userId: state.user.id
})

const mapDispatch = dispatch => ({
  sendCart: () => dispatch(sendCart(userId, active, total)),
  createOrderProductDetails: () =>
    dispatch(createOrderProductDetails(orderId, prodId, quantity, price)),
  fetchOrderByUserId: () => dispatch(fetchOrderByUserId(userId))
})

export default connect(mapStateToProps, mapDispatch)(Cart)
