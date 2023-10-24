import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Login } from './components/AuthForm'
import Home from './components/Home'
import AddTable from './components/AddTable'
import Waitlist from './components/WaitlistDashboard'
import SingleTable from './components/SingleTable'
import { me } from './store'

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn } = this.props

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/add-table" component={AddTable} />
            <Route path="/waitlist" component={Waitlist} />
            <Route path="/tables/:id" component={SingleTable} /> 
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Redirect to="/login" />
          </Switch>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  isLoggedIn: !!state.auth.id
})

const mapDispatch = dispatch => ({
  loadInitialData() {
    dispatch(me())
  }
})

export default withRouter(connect(mapState, mapDispatch)(Routes))
