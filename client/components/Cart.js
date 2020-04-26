import React, {Component} from 'react'
import Quantity from './Quantity'
import {connect} from 'react-redux'

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

  render() {
    const allProducts = JSON.parse(
      window.sessionStorage.getItem(this.props.userId)
    )
    // console.log('Cart Values>>>>>>>>>>>>>', allProducts)
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

export default connect(mapStateToProps, null)(Cart)
