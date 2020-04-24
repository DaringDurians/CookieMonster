import React from 'react'
import {connect} from 'react-redux'
import {
  updateOrderProductDetails,
  createOrderProductDetails
} from '../store/orderProduct'

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
                  const totalPrice = this.props.price * this.state.quantity
                  this.props.updateOrderProductDetails(
                    this.props.prodId,
                    this.state.quantity,
                    totalPrice
                  )
                }}
              >
                Update Cart
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  const totalPrice = this.props.price * this.state.quantity
                  if (this.state.quantity > 0) {
                    this.props.createOrderProductDetails(
                      this.props.order.id,
                      this.props.prodId,
                      this.state.quantity,
                      totalPrice
                    )
                  }
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

const mapStateToProps = state => ({
  orderProduct: state.orderProduct,
  order: state.order
})

const mapDispatchToProps = dispatch => ({
  updateOrderProductDetails: (prodId, quantity, totalPrice) =>
    dispatch(updateOrderProductDetails(prodId, quantity, totalPrice)),
  createOrderProductDetails: (orderId, productId, quantity, totalPrice) =>
    dispatch(
      createOrderProductDetails(orderId, productId, quantity, totalPrice)
    )
})

export default connect(mapStateToProps, mapDispatchToProps)(Quantity)
