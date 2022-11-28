
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'

class NewQuestion extends Component {

  constructor(props) {
    super(props);
    this.state={votedOption : "" , showVoting : false};
   
    //Handlers
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeOption1 = this.handleChangeOption1.bind(this);
    this.handleChangeOption2 = this.handleChangeOption2.bind(this);
  }
 
  handleChangeOption1(e){
    let value = e.target.value;
    this.setState({ option1:value });
  }

  handleChangeOption2(e){
    let value = e.target.value;
    this.setState({ option2:value });
  }

  handleSubmit(e)  {
    e.preventDefault();
  
    if(this.state.option1 ==="" || this.state.option ==="" ){
      alert("Please fill in both options");
    }else {
      this.props.dispatch(handleAddQuestion(this.state.option1, this.state.option2));
      this.props.history.push('/dashboard');
    }
  }

  render() {
     return (
      <div id="NewQuestionPage">
     
        <h3>Would you rather....</h3>
        <form onSubmit={(e)=>this.handleSubmit(e)}>
        <div class="form-group">
          <p className="form-label">Option 1:</p>
          <input className="form-control" placeholder="Option1"  type="text" onChange={(e) => this.handleChangeOption1(e)} />
          <br />
          <br />
          <p className="form-label">Option 2:</p>
          <input className="form-control" placeholder="Option2"  type="text" onChange={(e) => this.handleChangeOption2(e)} />
          <br />
          <br />
          <button className='new-poll-btn' type='submit'> Submit </button>
          </div>
        </form>

        <br />
      </div>
 )
}
}

export default connect()(NewQuestion)