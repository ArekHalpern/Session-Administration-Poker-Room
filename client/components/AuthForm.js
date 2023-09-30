import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';

const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form onSubmit={handleSubmit} name={name} className="text-center p-4">
        <div className="form-group">
          <input 
            name="username" 
            type="text" 
            className="form-control" 
            placeholder="Username" 
          />
        </div>
        <div className="form-group">
          <input 
            name="password" 
            type="password" 
            className="form-control" 
            placeholder="Password" 
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-block">{displayName}</button>
        </div>
        {error && error.response && <div className="alert alert-danger">{error.response.data}</div>}
      </form>
    </div>
  );
};


/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const username = evt.target.username.value
      const password = evt.target.password.value
      dispatch(authenticate(username, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
