import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, Homepage} from './components'
import SingleCookie from './components/SingleCookie'
import SingleUser from './components/SingleUser'
import SingleBrownie from './components/SingleBrownie'
import {me} from './store'

import AllCookies from './components/AllCookies'
import AllBrownies from './components/AllBrownies'

import {fetchAllCookies} from './store/cookies'
import {fetchAllBrownies} from './store/brownies'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    this.props.fetchAllBrownies()
    this.props.fetchAllCookies()
  }

  render() {
    const {isLoggedIn} = this.props
    console.log(this.props)
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/brownies" component={AllBrownies} />
        <Route exact path="/cookies" component={AllCookies} />
        <Route exact path="/" component={Homepage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/cookies/:cookieId" component={SingleCookie} />
        <Route exact path="/brownies/:brownieId" component={SingleBrownie} />
        <Route exact path="/users/:userId" component={SingleUser} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    fetchAllCookies() {
      dispatch(fetchAllCookies())
    },
    fetchAllBrownies() {
      dispatch(fetchAllBrownies())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
