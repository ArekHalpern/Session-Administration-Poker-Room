import React from 'react';
import { connect } from 'react-redux';

export const Home = props => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <button type="button" className="btn btn-primary mb-2">Add Table</button><br/>
        <button type="button" className="btn btn-primary mb-2">Add Player to Waitlist</button>
      </div>
    </div>
  );
};

const mapState = state => {
  return {
    username: state.auth.username
  };
};

export default connect(mapState)(Home);
