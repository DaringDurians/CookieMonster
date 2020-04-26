import React from 'react'
import {connect} from 'react-redux'
import {
  updateOrderProductDetails,
  createOrderProductDetails
  // getProduct,
} from '../store/orderProduct'

let totalPrice
export class Quantity extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      quantity: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.quantity !== this.props.quantity) {
      this.setState({quantity: nextProps.quantity})
    } else {
      this.setState({quantity: this.props.quantity})
    }
  }

  updateSessions() {
    let allProducts
    const prodName = this.props.products.find(el => el.id === this.props.prodId)
    let prod = {
      prodId: this.props.prodId,
      name: prodName.name,
      category: prodName.category,
      imgUrl: prodName.imgUrl,
      active: true,
      quantity: this.state.quantity,
      price: totalPrice
    }

    if (prod.quantity !== 0) {
      const temp = JSON.parse(window.sessionStorage.getItem(this.props.userId))
      if (temp !== null) {
        const found = temp.find(product => product.prodId === prod.prodId)
        if (found) {
          const updateProduct = temp.map(product => {
            if (product.prodId === prod.prodId) {
              product.quantity = prod.quantity
              product.price = prod.price
              return product
            } else {
              return product
            }
          })
          allProducts = updateProduct
        } else {
          allProducts = [...temp, prod]
        }
      } else {
        allProducts = [prod]
      }
      window.sessionStorage.setItem(
        this.props.userId,
        JSON.stringify(allProducts)
      )
    }
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
              value={this.state.quantity}
              onChange={event => {
                this.setState({quantity: event.target.value})
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
            {this.props.quantity > 0 ? (
              <button
                type="button"
                onClick={() => {
                  totalPrice = this.props.price * this.state.quantity
                  this.props.updateOrderProductDetails(
                    this.props.prodId,
                    this.state.quantity,
                    totalPrice
                  )
                  this.updateSessions()
                }}
              >
                Update Cart
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  totalPrice = this.props.price * this.state.quantity
                  if (this.state.quantity === 0) {
                    this.props.createOrderProductDetails(
                      this.props.order.id,
                      this.props.prodId,
                      this.state.quantity,
                      totalPrice
                    )
                  }
                  this.updateSessions()
                }}
              >
                {' '}
                Add To Cart
              </button>
            )}
          </div>
          <div />
        </div>
      </div>
    )
  }
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
  updateOrderProductDetails: (prodId, quantity, totalPrice) =>
    dispatch(updateOrderProductDetails(prodId, quantity, totalPrice)),
  createOrderProductDetails: (orderId, productId, quantity, totalPrice) =>
    dispatch(
      createOrderProductDetails(orderId, productId, quantity, totalPrice)
    )
  // getProduct: () => dispatch(getProduct()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Quantity)
