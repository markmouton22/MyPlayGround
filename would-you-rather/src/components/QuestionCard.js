import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

class QuestionCard extends Component {

  constructor(props) {
      console.log("CARD PROPS");
      console.log(props);
    super(props);
    this.state={ };
      //Handlers
      this.handleViewPoll = this.handleViewPoll.bind(this);

  }

  handleViewPoll(e,id){
    e.preventDefault()
    this.props.history.push(`/Question/${id}`)
  }

  render() {
    const {question,users} = this.props;
      return (
          <div className="card">
              <div className="card-body">
                  <h5 className="card-title">{users[question.author].name} is asking..</h5>
                  <input className="toggle-btn" onClick={(e) => this.handleViewPoll(e,question.id)}type="button" value="View Poll" />
              </div>
          </div>
      )
  }
}

function mapStateToProps({ questions, users, authedUser  }) {
  return {
      questions,
      users,
      authedUser,
  };
}

export default withRouter(connect(mapStateToProps)(QuestionCard))