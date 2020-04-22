import React from 'react'

export const Homepage = props => {
  return (
    <div>
      {/* <!-- See navbar.js for reference of what will show up above --> */}
      <div id="aboutUs">
        <div>
          <p>Nodemon...? Node..nom.. NOM NOM NOM</p>
        </div>
      </div>
      <div className="categories">
        <div className="cookieCategory">
          <div>
            <h3>Cookiezzzz</h3>
          </div>
          <div>
            <img
              src="https://www.handletheheat.com/wp-content/uploads/2015/06/Brown-Butter-Chocolate-Chip-Cookies-SQUARE.jpg"
              alt="choco chip cookies"
            />
          </div>
        </div>
        <div className="brownieCategory">
          <div>
            <h3>Browniezzzz</h3>
          </div>
          <div>
            <img
              src="https://40aprons.com/wp-content/uploads/2019/02/best-paleo-brownies-recipe-5.jpg"
              alt="brownies"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
