import React from 'react'
import {connect} from 'react-redux'
import {getQuantityThunk, setQuantityThunk} from '../store/quantity'
import {updateOrderProductDetails} from '../store/orderProduct'

let totalPrice, prodId, quantity, price, userId, name, imgUrl, active

export class Quantity extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      quantity: this.props.quantity ? this.props.quantity : 0,
      addedToCart: false
    }
  }

  componentWillMount() {
    if (
      window.sessionStorage.getItem(this.props.userId) &&
      this.props.prodId &&
      this.props.userId
    ) {
      this.props.getQuantityThunk(
        this.props.prodId,
        JSON.parse(window.sessionStorage.getItem(this.props.userId))
      )
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.quantity > 0) {
      this.setState({addedToCart: true})
    }

    if (nextProps.quantity !== this.props.quantity) {
      this.setState({
        quantity: nextProps.quantity
      })
    } else {
      this.setState({quantity: this.props.quantity})
    }
  }

  toggleQuantityButton() {
    if (this.state.quantity > 0) {
      this.setState({addedToCart: true})
    } else {
      this.setState({addedToCart: false})
    }
  }

  updateSessions() {
    // console.log('this.props in updateSessios', this.props)
    const prodName = this.props.products.find(el => el.id === this.props.prodId)
    prodId = this.props.prodId
    name = prodName.name
    imgUrl = prodName.imgUrl
    active = true
    quantity = this.state.quantity
    price = totalPrice
    userId = this.props.userId

    console.log('UPDATE SESSIONS>>>>>>>>', this.props)
    this.props.updateOrderProductDetails(
      prodId,
      quantity,
      price,
      userId,
      name,
      imgUrl,
      active
    )
  }

  removeProductFromSessions() {
    const prodId = this.props.prodId
    const temp = JSON.parse(window.sessionStorage.getItem(this.props.userId))
    const updateProduct = temp.filter(product => product.prodId !== prodId)
    window.sessionStorage.setItem(
      this.props.userId,
      JSON.stringify(updateProduct)
    )
  }

  render() {
    return (
      <div>
        <div className="quantityBox">
          <div>
            <button
              type="button"
              onClick={() => {
                if (this.state.quantity > 0) {
                  const newQuantity = this.state.quantity - 1
                  this.setState({quantity: newQuantity})
                }
              }}
            >
              -
            </button>
          </div>
          <div>
            <input
              type="number"
              name="quantity"
              id="quantity"
              min="0"
              value={this.state.quantity}
              onChange={event => {
                this.setState({quantity: parseInt(event.target.value)})
              }}
            />
          </div>
          <div>
            <button
              type="button"
              onClick={() => {
                const newQuantity = this.state.quantity + 1
                this.setState({quantity: newQuantity})
              }}
            >
              +
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={() => {
                totalPrice = this.props.price * this.state.quantity
                this.updateSessions()
                this.toggleQuantityButton()
                this.props.setQuantityThunk(this.state.quantity)
                if (this.props.updateClickHandlder) {
                  this.props.updateClickHandlder()
                }
              }}
            >
              {this.state.addedToCart ? 'Update Cart' : 'Add To Cart'}
            </button>
            {this.state.addedToCart ? (
              <button
                type="button"
                onClick={() => {
                  this.removeProductFromSessions()
                  this.setState({
                    quantity: 0,
                    addedToCart: false
                  })
                  this.props.setQuantityThunk(0)
                  if (this.props.updateClickHandlder) {
                    this.props.updateClickHandlder()
                  }
                }}
              >
                Remove Item
              </button>
            ) : (
              <div />
            )}
          </div>
          <div />
        </div>
      </div>
    )
  }
}

export const productsInfo = state => {
  return {products: [...state.cookies, ...state.brownies]}
}

const mapStateToProps = state => {
  return {
    orderProduct: state.orderProduct,
    order: state.order,
    userId: state.user.id,
    products: [...state.cookies, ...state.brownies]
  }
}

const mapDispatchToProps = dispatch => ({
  getQuantityThunk: (prodId, products) =>
    dispatch(getQuantityThunk(prodId, products)),
  setQuantityThunk: quantity => dispatch(setQuantityThunk(quantity)),
  updateOrderProductDetails: () =>
    dispatch(
      updateOrderProductDetails(
        prodId,
        quantity,
        price,
        userId,
        name,
        imgUrl,
        active
      )
    )
})

export default connect(mapStateToProps, mapDispatchToProps)(Quantity)
