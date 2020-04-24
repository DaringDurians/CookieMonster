import React from 'react'
import {Button} from 'reactstrap'
import {connect} from 'react-redux'
import {fetchCookie, updatedCookie} from '../store/singleCookie'
import ProductsForm from './ProductsForm'
import Quantity from './Quantity'

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
    category = 'Cookie'
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
    const {singleCookie} = this.props
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
            <p>Quantity: </p>
            <Quantity />
          </div>
          <div>
            {/* <Button color="info" type="button" id="button" onClick={()=> this.updateCart()}>
              Add To Cart
            </Button>{' '} */}
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    singleCookie: state.singleCookie,
    isAdmin: !!state.user.isAdmin
  }
}
const mapDispatch = dispatch => ({
  fetchCookie: () => dispatch(fetchCookie(cookieId)),
  updatedCookie: () =>
    dispatch(
      updatedCookie(cookieId, name, category, price, description, imgUrl)
    )
})

export default connect(mapState, mapDispatch)(SingleCookie)
