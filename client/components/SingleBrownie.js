import React from 'react'
import {Button} from 'reactstrap'
import {connect} from 'react-redux'
import {fetchBrownie, updatedBrownie} from '../store/singleBrownie'
import {fetchOrderProductDetails} from '../store/orderProduct'
import Quantity from './Quantity'
import ProductsForm from './ProductsForm'

let name
let category
let price
let description
let imgUrl
let brownieId
class SingleBrownie extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    brownieId = this.props.match.params.brownieId
    this.props.fetchBrownie(brownieId)
    this.props.fetchOrderProductDetails(brownieId)
  }
  handleChange() {
    this.setState({value: event.target.value})
  }
  handleSubmit() {
    event.preventDefault()
    name = event.target.name.value
    category = 'Brownie'
    price = parseInt(event.target.price.value) * 100
    description = event.target.description.value
    imgUrl = event.target.imgUrl.value
    this.props.updatedBrownie(
      brownieId,
      name,
      category,
      price,
      description,
      imgUrl
    )
    this.props.fetchBrownie(brownieId)
  }
  render() {
    const {singleBrownie} = this.props
    return (
      <div className="singleBox">
        {this.props.isAdmin ? (
          <div>
            <h3>Update Brownie Info</h3>
            <ProductsForm handleSubmit={this.handleSubmit} />
          </div>
        ) : null}
        <div>
          <img src={singleBrownie.imgUrl} alt="doubleChoco" />
        </div>
        <div className="brownieInfo">
          <h3>{singleBrownie.name}</h3>
          <div>
            <p>{singleBrownie.description}</p>
          </div>
          <div>
            <p>Price: ${(singleBrownie.price / 100).toFixed(2)}</p>
          </div>
          <div>
            <Quantity
              quantity={this.props.orderProduct.quantity || 0}
              prodId={singleBrownie.id}
              price={singleBrownie.price}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    singleBrownie: state.singleBrownie,
    orderProduct: state.orderProduct,
    isAdmin: !!state.user.isAdmin
  }
}
const mapDispatch = dispatch => ({
  fetchBrownie: () => dispatch(fetchBrownie(brownieId)),
  updatedBrownie: () =>
    dispatch(
      updatedBrownie(brownieId, name, category, price, description, imgUrl)
    ),
  fetchOrderProductDetails: prodId => dispatch(fetchOrderProductDetails(prodId))
})

export default connect(mapState, mapDispatch)(SingleBrownie)
