import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser';

class Nav  extends Component {

  constructor(props) {
    super(props);
    this.state = {}
    this.logout = this.logout.bind(this);
  }

  logout(){
    this.props.dispatch(setAuthedUser(""));
  }
 
  render() {

    if(this.props.currentUser !== ""){ return (
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/dashboard' exact activeClassName='active'>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/new" activeClassName='active'>
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to="/leaderboard" activeClassName='active'>
             Leaderboard
            </NavLink>
          </li>
          {this.props.currentUser !=="" &&
             <li>
             <strong>Hi! {this.props.currentUser}</strong>
           </li>
          }
          {this.props.currentUser !== "" &&
            <li>
              <input className="logout-btn" type="button" onClick={this.logout} value="Logout" />
            </li>
          }
        </ul>
      </nav>
      )}else{return (<div></div>)}
 
  }
}

function mapStateToProps ({authedUser,users}) {
  return {
    currentUser : authedUser && authedUser !=="" ? Object.values(users).find(user=>user.id === authedUser).name :"",
  }
}

export default connect(mapStateToProps)(Nav)