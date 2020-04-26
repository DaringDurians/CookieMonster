import React, {Component} from 'react'
import Quantity from './Quantity'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {sendCart} from '../store/order.js'

let userId
let active
let total

export class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }

    this.forceUpdateHandler = this.forceUpdateHandler.bind(this)
  }

  componentDidMount() {
    console.log('Cart Did Mount')
  }

  forceUpdateHandler() {
    this.forceUpdate()
  }

  handleCheckout(totalPrice) {
    userId = this.props.user.id
    active = false
    total = totalPrice
    this.props.sendCart(userId, active, total)
  }

  render() {
    console.log('current checkout', this.props)
    const allProducts = JSON.parse(
      window.sessionStorage.getItem(this.props.userId)
    )
    const {isLoggedIn} = this.props
    let totalItems = 0
    let totalPrice = 0
    return isLoggedIn ? (
      <div id="cartBox">
        <div>
          <p>Itemized Breakdown:</p>
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
                        {console.log('PRODUCT.QUANTITY', product.quantity)}
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
                <NavLink to="/confirm">
                  <button
                    type="button"
                    name="checkout"
                    onClick={() => this.handleCheckout(totalPrice)}
                  >
                    Checkout
                  </button>
                </NavLink>
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
  order: state.order,
  userId: state.user.id
})

const mapDispatch = dispatch => ({
  sendCart: () => dispatch(sendCart(userId, active, total))
})

export default connect(mapStateToProps, mapDispatch)(Cart)
