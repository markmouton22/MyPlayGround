import {  _saveQuestion,_saveQuestionAnswer } from '../utils/_DATA';
import { showLoading, hideLoading } from 'react-redux-loading';
import { addQuestionToUsers , addAnswerToUsers } from './users';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_ANSWER = 'ADD_ANSWER';

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

function addAnswerToQuestions(questions) {
  return {
      type: ADD_ANSWER,
      questions,
  };
}

export function handleAddQuestion (option1, option2) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(showLoading());

    return _saveQuestion({
      option1,
      option2,
      author: authedUser,
    
    }).then((question) => {

      dispatch(addQuestion(question));
      dispatch(addQuestionToUsers(question));
      dispatch(hideLoading());
  });
  }
}

export function handleAddAnswer(answer,qid) {

  return (dispatch, getState) => {
      const { authedUser } = getState();
     
      dispatch(showLoading());
      return _saveQuestionAnswer({
          authedUser: authedUser,
          qid,
          answer,
      }).then((responce) => {
         
          dispatch(addAnswerToQuestions(responce.questions));
          dispatch(addAnswerToUsers(responce.users));
          dispatch(hideLoading());
      });
  };
}