import { receiveUsers } from './users';
import { receiveQuestions } from './questions';
import { _getQuestions ,_getUsers} from '../utils/_DATA';
import { showLoading, hideLoading } from 'react-redux-loading'
import { setAuthedUser } from '../actions/authedUser'

const AUTHED_ID = '';

export function handleInitialData() {
    return (dispatch) => {
        return Promise.all([_getQuestions(), _getUsers()]).then((data) => {
            dispatch(showLoading())
            dispatch(receiveUsers(data[1]))
            dispatch(receiveQuestions(data[0]))
            dispatch(setAuthedUser(AUTHED_ID))
            dispatch(hideLoading())
        });
    };
}