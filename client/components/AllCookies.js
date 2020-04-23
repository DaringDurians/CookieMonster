import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

export const AllCookies = props => {
  return (
    <div className="allView">
      {props.cookies
        ? props.cookies.length
          ? props.cookies.map(cookie => {
              return (
                <div className="dessertBox" key={cookie.id}>
                  <NavLink to={`/cookies/${cookie.id}`}>
                    <div>
                      <h3>{cookie.name}</h3>
                    </div>
                    <div className="allViewImg">
                      <img src={cookie.imgUrl} alt="cookie images" />
                    </div>
                    <div>Price: ${(cookie.price / 100).toFixed(2)}</div>
                  </NavLink>
                  <div>
                    <button type="button">Add To Cart</button>
                  </div>
                </div>
              )
            })
          : 'No Cookies'
        : 'No Cookies'}
    </div>
  )
}

const mapStateToProps = state => ({
  cookies: state.cookies
})

export default connect(mapStateToProps, null)(AllCookies)
