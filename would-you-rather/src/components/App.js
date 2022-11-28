import React, { Component , Fragment } from 'react';
import { handleInitialData } from '../actions/shared';
import { Route, Redirect } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import NewQuestion from './NewQuestion';
import Question from './QuestionPage';
import leaderboard from './Leaderboard';
import Login from './Login';
import { PageNotFound } from './404-page';
import Nav  from './Nav';
import LoadingBar from 'react-redux-loading';

class App extends Component {
   
    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }
    render() {
        
        return (
            <>
               
                {!this.props.isLogedIn ? (
                    <Route path="/" component={Login}></Route>
                ) : (
                    <Fragment>
                     <LoadingBar />
                        <Route
                            path={[
                                '/dashboard',
                                '/new',
                                '/question',
                                '/leaderboard',
                            ]}
                            component={Nav}
                        />
                        <Switch>
                            <Route
                                exact
                                path="/dashboard"
                                component={Dashboard}
                            ></Route>
                            <Route
                                exact
                                path="/new"
                                component={NewQuestion}
                            ></Route>
                            <Route
                                exact
                                path="/question/:id"
                                component={Question}
                            ></Route>
                            <Route
                                exact
                                path="/leaderboard"
                                component={leaderboard}
                            ></Route>
                      
                            <Redirect exact from="/" to="/dashboard" />
                            <Route component={PageNotFound} />
                        </Switch>
                    </Fragment>
                )}
            </>
        );
    }
}

function mapStateToProps(data) {
    return {
        isLogedIn: data.authedUser !==null &&data.authedUser !=="" ? true :false 
    };
}

export default connect(mapStateToProps)(App);
