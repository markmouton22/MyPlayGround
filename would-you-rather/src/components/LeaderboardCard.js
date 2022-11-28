import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserTag,faUserAstronaut,faUserTie } from '@fortawesome/fontawesome-free-solid';

class LeaderboardCard extends Component {

  constructor(props) {
      console.log("CARD PROPS");
      console.log(props);
    super(props);
    this.state={ };
      //Handlers
      this.handleViewPoll = this.handleViewPoll.bind(this);
      this.getAvatarFontAwesomeIcon = this.getAvatarFontAwesomeIcon.bind(this);
      this.getCardcolor = this.getCardcolor.bind(this);
  }

  getCardcolor(nr){
    const prefix = "card";
    
    let color ="";

    switch(nr) {
     // eslint-disable-next-line 
      case 1: color = prefix +" "+ "posion1";
      break;
     // eslint-disable-next-line 
      case 2: color = prefix +" "+ "posion2";
      break;
     // eslint-disable-next-line 
      case 3: color = prefix +" "+ "posion3";
      break;

      default:color = prefix;
    }

    return color;
  }

  getAvatarFontAwesomeIcon(src) { //replace sourse with free font awesome sourses -Credit https://fontawesome.com/

    if(src && src !== "" ){
 
     if(src.includes("snow.jpg")){
 
       return faUserTag;
 
     }else if(src.includes("tyler.jpg")){
 
       return faUserAstronaut;
 
     }else if(src.includes("leaf.jpg")){
       return faUserTie;
     }
    
   }
 }

  handleViewPoll(e,id){
    e.preventDefault()
    this.props.history.push(`/Question/${id}`)
  }

  render() {
    const {answeredQuestions,askedQuestions,userName,imgUrl,nrOnBoard} = this.props;
   
      return (
          <div className={this.getCardcolor(nrOnBoard)}>
              <div className="card-body">
              <div class="container">
                  <div className="row">
                    <div className="col-12 mx-auto">
                      <strong className="">{nrOnBoard}</strong>
                      </div>
                      <div className="col-1">
                          <FontAwesomeIcon icon={this.getAvatarFontAwesomeIcon(imgUrl)} />
                      </div>
                      <div className="col-11">
                          <h3> {userName}</h3>
                      </div>
                  </div>
                  </div>

                  <div className="row">
                  <div className="col-12">
                         <p>Asked Questions:{askedQuestions}</p>
                      </div>
                      <div className="col-12">
                      <p>Answered Questions:{answeredQuestions}</p>
                      </div>
                   </div>

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

export default withRouter(connect(mapStateToProps)(LeaderboardCard))