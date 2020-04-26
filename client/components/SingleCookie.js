import React from 'react'
import {connect} from 'react-redux'
import {fetchCookie, updatedCookie} from '../store/singleCookie'
import {fetchOrderProductDetails} from '../store/orderProduct'
import Quantity from './Quantity'
import ProductsForm from './ProductsForm'

let name
let category
let price
let description
let imgUrl
let cookieId
export class SingleCookie extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    cookieId = this.props.match.params.cookieId
    this.props.fetchCookie(cookieId)
  }
  handleSubmit() {
    event.preventDefault()
    name = event.target.name.value
    category = 'cookies'
    price = parseInt(event.target.price.value) * 100
    description = event.target.description.value
    imgUrl = event.target.imgUrl.value
    this.props.updatedCookie(
      cookieId,
      name,
      category,
      price,
      description,
      imgUrl
    )
    this.props.fetchCookie(cookieId)
  }
  updateCart() {}
  render() {
    const {singleCookie, userId} = this.props
    const currentCart = JSON.parse(window.sessionStorage.getItem(userId))
    return (
      <div className="singleBox">
        {this.props.isAdmin ? (
          <div>
            <h3>Update Cookie Info</h3>
            <ProductsForm handleSubmit={this.handleSubmit} category="Cookie" />
          </div>
        ) : null}
        <div id="singleCookieImage">
          <img src={singleCookie.imgUrl} alt="doubleChoco" />
        </div>
        <div className="cookieInfo">
          <h3>{singleCookie.name}</h3>
          <div>
            <p>{singleCookie.description}</p>
          </div>
          <div>
            <p>Price: {(singleCookie.price / 100).toFixed(2)}</p>
          </div>
          <div>
            <Quantity
              quantity={
                currentCart
                  ? currentCart.find(
                      prodObj => prodObj.prodId === singleCookie.id
                    )
                    ? currentCart.find(
                        prodObj => prodObj.prodId === singleCookie.id
                      ).quantity
                    : 0
                  : 0
              }
              prodId={singleCookie.id}
              price={singleCookie.price}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    userId: state.user.id,
    singleCookie: state.singleCookie,
    orderProduct: state.orderProduct,
    isAdmin: !!state.user.isAdmin
  }
}
const mapDispatch = dispatch => ({
  fetchCookie: () => dispatch(fetchCookie(cookieId)),
  updatedCookie: () =>
    dispatch(
      updatedCookie(cookieId, name, category, price, description, imgUrl)
    ),
  fetchOrderProductDetails: prodId => dispatch(fetchOrderProductDetails(prodId))
})

export default connect(mapState, mapDispatch)(SingleCookie)
