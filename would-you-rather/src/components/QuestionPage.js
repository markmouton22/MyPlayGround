import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserTag,faUserAstronaut,faUserTie } from '@fortawesome/fontawesome-free-solid';
import { handleAddAnswer } from '../actions/questions';

class QuestionPage extends Component {

  constructor(props) {
    super(props);
    this.state={votedOption : "" , showVoting : false};
    this.getAvatarFontAwesomeIcon = this.getAvatarFontAwesomeIcon.bind(this);
    this.voteOption1 = this.voteOption1.bind(this);
    this.voteOption2 = this.voteOption2.bind(this);
    this.handleDone = this.handleDone.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  
  componentDidMount(){
    const selectedQuestion = this.props.questions[this.props.id];

    var optionOneVotes = selectedQuestion.optionOne.votes;
    var optionTwoVotes = selectedQuestion.optionTwo.votes;

      //check if authed user was the voter 
        
          var isOption1 = optionOneVotes.find(vote=> vote === this.props.authedUser );
          var isOption2 = optionTwoVotes.find(vote=> vote === this.props.authedUser );

          //set show voring
          this.setState({ showVoting: isOption1 === undefined && isOption2 === undefined ? true : false });
  }

  handleDone(id){
    if(this.state.votedOption === ""){
      alert("Please vote");
    } else{
      this.props.dispatch(
        handleAddAnswer(this.state.votedOption, id)
    );
    this.setState({ showVoting: false });
    }
  }

  voteOption1(){
    this.setState({ votedOption: "optionOne"});
  }

  voteOption2(){
    this.setState({ votedOption: "optionTwo" });
  }

  getAvatarFontAwesomeIcon(src) { //replace sourse with free font awesome sourses -Credit https://fontawesome.com/

   if(src && src !=="" ){

    if(src.includes("snow.jpg")){

      return faUserTag;

    }else if(src.includes("tyler.jpg")){

      return faUserAstronaut;

    }else if(src.includes("leaf.jpg")){
      return faUserTie;
    }
   
  }
}

    render() {
 
      const selectedQuestion = this.props.questions[this.props.id];
      const user = this.props.users[selectedQuestion.author];

      // const authedUser =  this.props.users[this.props.authedUser];
      const avatar = user.avatarURL;

      var optionOneVotes = selectedQuestion.optionOne.votes;
      var optionTwoVotes = selectedQuestion.optionTwo.votes;

      //check if authed user was the voter 
        
          var isOption1 = optionOneVotes.find(vote=> vote === this.props.authedUser );
          var isOption2 = optionTwoVotes.find(vote=> vote === this.props.authedUser );

          //set show voring
          // var showVoting = isOption1 === undefined && isOption2 === undefined ? true : false;
        
          //if authed user was the voter then display the results

          //if not then display voting page
    
    //votes
    if(selectedQuestion.optionOne !== undefined && selectedQuestion.optionOne.votes !== undefined) {
    
      var nrOption1Votes = optionOneVotes ? optionOneVotes.length : 0 ;
      var nrOption2Votes =  optionTwoVotes ? optionTwoVotes.length  : 0 ;

      var totalVotes = nrOption1Votes  + nrOption2Votes ;

      var percentageOption1Votes = (nrOption1Votes/totalVotes) *100 ;
      var percentageOption2Votes = (nrOption2Votes/totalVotes) *100 ;

      //check what option the  user voted for
       isOption1 = optionOneVotes.find(vote=> vote === user.id );
       isOption2 = optionTwoVotes.find(vote=> vote === user.id );
    }
   
    return (
     <div id="QuestionPage">
        <h1>Would You Rather</h1>
        <div className="row">
          <div className="col-1">
            <FontAwesomeIcon icon={this.getAvatarFontAwesomeIcon(avatar)} />
          </div>
          <div className="col-11">
            <h3> {user.name} is asking.....</h3>
          </div>
        </div>

        <br />

        {this.state.showVoting &&
          <>
            <p className="option1" >1. {selectedQuestion.optionOne.text}</p>
         
            <br />
            <p className="option2">2. {selectedQuestion.optionTwo.text}</p>
            <br />

            <div className="container">
            <h3>Please Vote:</h3>
        
              <input className={this.state.votedOption === "optionOne" ? "btn option1-btn" : "btn"} type="button" onClick={this.voteOption1} value="option 1" />
              
              <input className={this.state.votedOption === "optionTwo" ? "btn option2-btn" : "btn"} type="button" onClick={this.voteOption2} value="option 2" />
       
            <br />
           <input className="btn vote-btn" type="button" onClick={() => this.handleDone(selectedQuestion.id)} value="Vote" />
            </div>
          </>
       }

        {!this.state.showVoting &&
          <>
            <p className="option1" >1. {selectedQuestion.optionOne.text}</p>
            <p>{nrOption1Votes + "/" + totalVotes + " or " + percentageOption1Votes + "%"}</p>

            {/* the number of people who voted for that option;
            the percentage of people who voted for that option. */}
            <br />
            <p className="option2">2. {selectedQuestion.optionTwo.text}</p>
            <p>{nrOption2Votes + "/" + totalVotes + " or " + percentageOption2Votes + "%"}</p>
            <br />
            <h3>You Voted:</h3>
            <div className="row">

              <input className={isOption1 !== undefined ? "btn option1-btn" : "btn"} type="button" value="option 1" disabled />

              <input className={isOption2 !== undefined ? "btn option2-btn" : "btn"} type="button" value="option 2" disabled />
            </div>
           
            <br />
          </>

        }

      </div>
)
}
}

function mapStateToProps ({authedUser, users, questions}, props) {
  const { id } = props.match.params;

  return {
    authedUser,
    questions,
    users,
    id
  }
}

export default withRouter(connect(mapStateToProps)(QuestionPage))