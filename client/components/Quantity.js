import React from 'react'
import {connect} from 'react-redux'



let totalPrice
export class Quantity extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      quantity: 0,
      addedToCart: false
    }
  }

  componentDidMount() {
    console.log('Quantity Did Mount')
  }

  componentWillReceiveProps(nextProps) {
    console.log('next', nextProps)
    console.log('this', this.props)

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

    const temp = JSON.parse(window.sessionStorage.getItem(this.props.userId))
    if (temp !== null) {
      const found = temp.find(product => product.prodId === prod.prodId)
      if (found) {
        const updateProduct = temp
          .map(product => {
            if (product.prodId === prod.prodId) {
              product.quantity = prod.quantity
              product.price = prod.price
              return product
            } else {
              return product
            }
          })
          .filter(product => product.quantity !== 0)
        allProducts = updateProduct
      } else if (prod.quantity !== 0) {
        allProducts = [...temp, prod]
      } else {
        allProducts = [...temp]
      }
    } else if (prod.quantity !== 0) {
      allProducts = [prod]
    }
    window.sessionStorage.setItem(
      this.props.userId,
      JSON.stringify(allProducts)
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
              }}
            >
              {this.state.addedToCart ? 'Update Cart' : 'Add To Cart'}
            </button>
            {this.state.addedToCart ? (
              <button
                onClick={() => {
                  this.removeProductFromSessions()
                  this.setState({
                    quantity: 0,
                    addedToCart: false
                  })
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

const mapStateToProps = state => {
  return {
    orderProduct: state.orderProduct,
    order: state.order,
    userId: state.user.id,
    products: [...state.cookies, ...state.brownies]
  }
}

// const mapDispatchToProps = dispatch => ({
//   // getProduct: () => dispatch(getProduct()),
// })

export default connect(mapStateToProps, null)(Quantity)
