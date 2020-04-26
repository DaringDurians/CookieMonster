import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    // console.log('BEFORE PARSING values>>>>>>>>>>>>>', allProducts)
    const allProducts = JSON.parse(
      window.sessionStorage.getItem(this.props.userId)
    )
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
          {allProducts ? (
            allProducts.length ? (
              allProducts.map(product => {
                totalItems += product.quantity
                totalPrice += product.quantity * product.price
                return (
                  <ul key={product.id}>
                    <div className="smallImg">
                      <img src={product.imgUrl} /> {product.name} x{' '}
                      {product.quantity} :{' '}
                      {'$' + (product.price / 100).toFixed(2)}{' '}
                    </div>
                  </ul>
                )
              })
            ) : (
              <div />
            )
          ) : (
            <div>
              <p>No items in cart</p>
            </div>
          )}
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
                <Link to="/home">
                  <button type="button">Check Out</button>
                </Link>
              </div>
            </div>
          ) : (
            <div />
          )
        ) : (
          <div />
        )}
      </div>
      // ) : (
      //   <div id="aboutUs">
      //     <p>No items in cart</p>
      //   </div>
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
