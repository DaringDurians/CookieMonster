import React, {Component} from 'react'
import axios from 'axios'
import Quantity from './Quantity'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {sendCart, fetchOrderByUserId} from '../store/order.js'
import {createOrderProductDetails} from '../store/orderProduct'
import {CheckoutForm} from './CheckoutForm'
import {Confirmation} from './Confirmation'

let userId
let active
let total
let orderId
let prodId
let quantity
let name
let email
let price
let allProducts
let totalPrice = 0
export class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      updated: false,
      isGuest: true,
      name: '',
      email: '',
      showCheckoutForm: false,
      checkedOut: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.updateClickHandler = this.updateClickHandler.bind(this)
  }

  updateClickHandler() {
    this.setState({updated: !this.state.updated})
  }

  handleClick() {
    return this.setState({
      showCheckoutForm: true
    })
  }

  async handleFormSubmit(event) {
    event.preventDefault()
    console.log('HANDLE FORM SUBMIT')
    this.setState(
      {
        name: event.target.fullname.value,
        email: event.target.email.value,
        checkedOut: true
      },
      function() {
        this.handleCheckout()
      }
    )
    // this.handleCheckout()
  }

  async handleCheckout(id) {
    console.log('HANDLE CHECKOUT THIS.PROPS', this.props)
    if (userId === undefined) {
      userId = id
    }
    active = false
    total = totalPrice
    console.log('THIS.STATE', this.state)
    name = this.state.name
    email = this.state.email
    const check = await this.props.sendCart(userId, active, total, name, email)
    console.log(check, 'check what comes from send cart thunk')
    // const {data} = await axios.get(`/api/order/${userId}`)
    // console.log(
    //   data,
    //   'check what comes from get route after sendcart thunk in handle checkout'
    // )
    // orderId = data[0].id
    // allProducts.map(product => {
    //   prodId = product.prodId
    //   quantity = product.quantity
    //   price = product.price
    //   this.props.createOrderProductDetails(orderId, prodId, quantity, price)
    // })
    // await axios.put(`/api/order/${orderId}`, {active: false})
  }

  // eslint-disable-next-line complexity
  render() {
    allProducts = JSON.parse(window.sessionStorage.getItem(this.props.userId))

    console.log('values>>>>>>>>>>>>>', allProducts)
    // const {isLoggedIn} = this.props

    let orderPrice = 0
    let totalItems = 0
    return (
      <div id="cartBox">
        <div>
          {this.state.showCheckoutForm && !this.state.checkedOut ? (
            <CheckoutForm handleFormSubmit={this.handleFormSubmit} />
          ) : null}
        </div>
        {!this.state.checkedOut ? (
          <div>
            <p>Cart Contents:</p>
            <div id="itemizedSummary">
              {allProducts
                ? allProducts.length
                  ? allProducts.map(product => {
                      totalItems += product.quantity
                      totalPrice += product.price
                      orderPrice += product.price
                      return (
                        <ul key={product.prodId}>
                          <div className="smallImg">
                            <img src={product.imgUrl} /> {product.name} x{' '}
                            {product.quantity} :{' '}
                            {'$' + (product.price / 100).toFixed(2)}{' '}
                            <Quantity
                              quantity={product.quantity}
                              prodId={product.prodId}
                              price={product.price / product.quantity}
                              updateClickHandlder={this.updateClickHandler}
                              onRender={() => {
                                this.setState({loaded: !this.state.loaded})
                              }}
                            />
                          </div>
                        </ul>
                      )
                    })
                  : 'No items in cart'
                : 'No items in cart'}
            </div>
            <div>
              {allProducts ? (
                allProducts ? (
                  <div id="totalSummary">
                    <div>
                      <p>Total Items: {totalItems}</p>
                    </div>
                    <div>
                      <p>Total Price: {'$' + (orderPrice / 100).toFixed(2)}</p>
                    </div>
                    <div>
                      {console.log('userId', userId)}
                      {this.props.user.id === undefined &&
                      this.state.showCheckoutForm === false ? (
                        <button
                          type="button"
                          name="checkout"
                          onClick={this.handleClick}
                        >
                          Checkout
                        </button>
                      ) : (
                        <NavLink to="/confirm">
                          <button
                            type="button"
                            name="checkout"
                            onClick={() =>
                              this.handleCheckout(this.props.user.id)
                            }
                          >
                            Place Order
                          </button>
                        </NavLink>
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
          </div>
        ) : (
          <Confirmation />
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
  sendCart: () => dispatch(sendCart(userId, active, total, name, email)),
  createOrderProductDetails: () =>
    dispatch(createOrderProductDetails(orderId, prodId, quantity, price)),
  fetchOrderByUserId: () => dispatch(fetchOrderByUserId(userId))
})

export default connect(mapStateToProps, mapDispatch)(Cart)
