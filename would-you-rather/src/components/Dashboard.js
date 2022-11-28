import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import QuestionCard from './QuestionCard';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      toggleIsAnswered: false,
    };

    //Handlers
    this.handleChange = this.handleChange.bind(this);
    this.setUnanswered = this.setUnanswered.bind(this);
    this.setAnswered = this.setAnswered.bind(this);
  }

  setUnanswered() {
    this.setState({ toggleIsAnswered: false });
  }
  
  setAnswered() {
    this.setState({ toggleIsAnswered: true });
  }

  handleChange(e) {
    this.props.dispatch(setAuthedUser(e.target.value))
  }

  render() {
   
    let answeredKeys = Object.keys(this.props.answeredQuestions);
    let allQuestionsKeys = Object.keys(this.props.questions);

    //The difference will give us the elements from allQuestionsKeys that are not in the answeredKeys.
    let unAnsweredKeys = allQuestionsKeys.filter(x => !answeredKeys.includes(x));
    //Find the highest value in the arrays answeredQuestions and unAnsweredQuestions for sorting 
    var answeredQuestions = answeredKeys.map((key) => Object.values(this.props.questions).filter(question => question.id === key)).sort((x, y) =>  y[0].timestamp - x[0].timestamp);

    var unAnsweredQuestions = unAnsweredKeys.map((key) => Object.values(this.props.questions).filter(question => question.id === key)).sort((x, y) =>  y[0].timestamp - x[0].timestamp);
     
    return (
      <div id="DashBoard">

        <input className={!this.state.toggleIsAnswered ?"toggle-btn btn-blue":"toggle-btn"} onClick={this.setUnanswered} type="button" value="Unanswered" />

        <input className={this.state.toggleIsAnswered ?"toggle-btn btn-blue":"toggle-btn"} onClick={this.setAnswered} type="button" value="Answered" />

        {this.state.toggleIsAnswered &&
        <>
          <h3 className="center">Answered Questions</h3>
           {answeredQuestions.map((question) =>
            <QuestionCard key={question[0].id} question={question[0]} />
          )}
        </>
        }

        {!this.state.toggleIsAnswered &&
         <>
        <br />
        <h3 className="center">Unanswered Questions</h3>
        {unAnsweredQuestions.map((question) =>
          <QuestionCard key={question[0].id} question={question[0]} />
        )}
        </>
        }
      </div>
    )
  }
}

function mapStateToProps({ questions, users, authedUser,history }) {

  let answeredQuestions = {};
  let unAnsweredQuestions = {};

  Object.keys(authedUser).length !== 0 && Object.keys(users).length !== 0 ? (answeredQuestions = users[authedUser]['answers']) : answeredQuestions = {};

  return {
    answeredQuestions,
    unAnsweredQuestions,
    questions,
    users,
    authedUser,
    history
  };
}

export default connect(mapStateToProps)(Dashboard)
