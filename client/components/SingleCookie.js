import {React, Button} from 'react'
import {connect} from 'react-redux'
import {fetchCookie} from '../store/singleCookie'
import {NavLink} from 'react-router-dom'

export class SingleCookie extends React.Component {
  render() {
    return (
      <div id="singleCookieBox">
        <div id="singleCookieImage">
          <img src="tbd" alt="tbd" />
        </div>
        <div>
          <p>Cookie Description Goes Here</p>
        </div>
        <div id="cookieInfo">
          <div>
            <p>Price: </p>
          </div>
          <div>
            <p>Quantity: </p>
          </div>
          <div>
            <button variant="primary" type="button" id="button">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    )
  }
}
