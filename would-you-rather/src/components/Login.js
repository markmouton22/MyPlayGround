import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state={ };

  //Handlers
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    console.log("Option changed:");
    console.log(e.target.value);
    this.props.dispatch(setAuthedUser(e.target.value));
  }

  render() {

    const allUsers = this.props.users;
      return (
        <div className="login-page">
          <br />
          <h1 className="center">Would you rather...</h1>
          <br />
          <h3 className="center">Select Login User</h3>
          <div className="container-login">
          <select className="login-select" defaultValue={""} onChange={this.handleChange}>
          <option value="" disabled >Select User</option>
            {Object.values(allUsers).map((option, index) =>
              <option key={index} value={option.id}>
                {option.name}
              </option>
            )}
          </select>
        </div>
        </div>
      )
  
  }
}

function mapStateToProps({ questions, users, authedUser }) {
  return {
      questions,
      users,
      authedUser
  };
}

export default connect(mapStateToProps)(Login)
