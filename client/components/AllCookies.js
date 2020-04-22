import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

const AllCookies = props => {
  console.log(props.cookies)
  return (
    <div>
      <div>
        {props.cookies
          ? props.cookies.length
            ? props.cookies.map(cookie => {
                return (
                  <div key={cookie.id}>
                    <div>
                      <NavLink to={`/cookies/${cookie.id}`}>
                        Name: {cookie.name}
                      </NavLink>
                    </div>
                    <div>
                      Price: {`$${Number((cookie.price / 100).toFixed(2))}`}
                    </div>
                    <div>Description: {cookie.description}</div>
                    <div>
                      <img src={cookie.imgUrl} alt="cookie images" />
                    </div>
                    <div>
                      <button type="button">Add To Cart</button>
                    </div>
                  </div>
                )
              })
            : 'No Cookies'
          : 'No Cookies'}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  cookies: state.cookies
})

export default connect(mapStateToProps, null)(AllCookies)
