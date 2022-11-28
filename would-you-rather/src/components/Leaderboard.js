import React, { Component } from 'react';
import { connect } from 'react-redux';
import LeaderboardCard from './LeaderboardCard';

class Leaderboard extends Component {

  render() {

    let users = this.props.users;

    let leaderboardIds = Object.keys(users).sort((a, b) => {
      // sum of the number of questions they’ve answered and the number of questions they’ve asked.The var a an b inside function
      let c = Object.keys(users[b].answers).length + Object.keys(users[b].questions).length;

      let d = Object.keys(users[a].answers).length + Object.keys(users[a].questions).length;

      return c - d;  //Sort numbers in the array in descending order. [0] highest value

    });

    return (
      <div id="Leaderboard">
        <h1>Leaderboard</h1>
        {leaderboardIds.map((id, index) =>
          <div key={index + 1}>
            <LeaderboardCard userName={users[id].name} imgUrl={users[id].avatarURL} answeredQuestions={Object.keys(users[id].answers).length} askedQuestions={users[id].questions.length} nrOnBoard={index + 1} />
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps({ users, authedUser }) {
  return {
    users: users,
    authedUser: authedUser
  };
}

export default connect(mapStateToProps)(Leaderboard)