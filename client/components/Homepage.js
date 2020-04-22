import React from 'react'
import {NavLink} from 'react-router-dom'

export const Homepage = props => {
  return (
    <div id="homepageBox">
      {/* <!-- See navbar.js for reference of what will show up above --> */}
      <div id="aboutUs">
        <div>
          <p>Welcome Message</p>
        </div>
        <div>
          <img src="tbd" alt="tbd" />
        </div>
      </div>
      <div id="cookieCategory">
        <div>
          <NavLink to="/cookies">
            <h3>Cookies</h3>
          </NavLink>
        </div>
        <div>
          <img src="tbd" alt="tbd" />
        </div>
      </div>
      <div id="brownieCategory">
        <div>
          <NavLink to="/brownies">
            <h3>Brownies</h3>
          </NavLink>
        </div>
        <div>
          <img src="tbd" alt="tbd" />
        </div>
      </div>
    </div>
  )
}
