import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import * as API_SignIn from '../api/API_SignIn';
import * as API_SignUp from '../api/API_SignUp';
import * as API_IsSignedIn from "../api/API_IsSignedIn";
import * as API_SignOut from "../api/API_SignOut";
import Homepage from "./HomePage";
import SharedFiles from "./Shared Files";
import Groups from "./Groups";
import Activity from "./Activity";
import Profile from "./Profile";
import Error from "./Error";

class RoutingComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false,
            signInMessage: undefined,
            signUpMessage: undefined,
            email: undefined,
            username: undefined
        };
    }

    handleIsSignedIn = () => {

        console.log("In handle IsSignedIn");

            let username = this.state.username;

            console.log("Username in state = "+this.state.username);

            API_IsSignedIn.checkIsSignedIn(username)
                .then( (response) => {

                    if(response.status === 200){

                        console.log("Status = " + response.status + ", Authorized to access page.");

                    }


                    else if(response.status === 401){

                        console.log("Status = " + response.status + ", Unauthorized to access page, redirecting to SignIn");

                        this.props.history.push("/SignIn");

                    }

                    else{

                        this.props.history.push("/Error");

                    }
                });
        };

    handleSignUp = (state) => {

        // if(state.firstName === "" || state.firstName === null ||state.firstName === undefined){
        //
        // }

        console.log("In handle SignUp, isSignedIn ="+this.state.isSignedIn);

        API_SignUp.doSignUp(state)
            .then( (response) => {

                console.log(response);

                if(response.status === 201){

                    this.setState({
                        ...this.state,
                        isSignedIn: true,
                        signUpMessage: undefined,
                        signInMessage: undefined,
                        email: response.email,
                        username: response.username
                    });

                    console.log("In handle SignUp, status = "+ response.status+" isSignedIn = "+this.state.isSignedIn+" pushing to HomePage"+response.email+" "+response.username);

                    this.props.history.push("/HomePage");
                }

                else if(response.status === 403){

                    this.setState({
                        ...this.state,
                        isSignedIn: false,
                        signInMessage: undefined,
                        username: undefined,
                        email: undefined,
                        signUpMessage: 'User Already Exists'
                    });

                }

                else if(response.status === 303){

                    this.setState({
                        ...this.state,
                        isSignedIn: false,
                        signInMessage: undefined,
                        username: undefined,
                        email: undefined,
                        signUpMessage: '!! Required Fields are not filled !! '
                    });

                }

                else{

                    this.props.history.push("/Error");

                }

            });
    };

    handleSignIn = (state) => {

        console.log("In handle SignIn, isSignedIn ="+this.state.isSignedIn);

        API_SignIn.doSignIn(state)
            .then( (response) => {

                console.log("In response of Sign In : "+response.status);

                if(response.status === 200){

                    this.setState({
                        ...this.state,
                        isSignedIn: true,
                        signInMessage: undefined,
                        signUpMessage: undefined,
                        email: response.email,
                        username: response.username
                    });

                    console.log("usernameSet : "+this.state.username+" "+response.username);

                    this.props.history.push("/HomePage");
                }

                else if(response.status === 401){

                    this.setState({
                        ...this.state,
                        isSignedIn: false,
                        signUpMessage: undefined,
                        username: undefined,
                        email: undefined,
                        signInMessage: 'Invalid Username or Password'
                    });

                    console.log("In handle SignIn, status = "+ response.status+" isSignedIn = "+this.state.isSignedIn+" remaining in same page");

                }

                else if(response.status === 303){

                    this.setState({
                        ...this.state,
                        isSignedIn: false,
                        signUpMessage : undefined,
                        username: undefined,
                        email: undefined,
                        signInMessage: '!! Required Fields are not filled !! '
                    });

                }

                else{

                    this.props.history.push("/Error");

                }

            });
    };

    handleSignOut = () => {

        API_SignOut.doSignOut()
            .then( (response) => {
                console.log("In sign out - "+response.status);
                if(response.status === 200){

                    this.setState({
                        ...this.state,
                        isSignedIn: false,
                        signInMessage: undefined,
                        signUpMessage: undefined,
                        email: undefined,
                        username: undefined
                    });

                    console.log("usernameUnSet : "+this.state.username);

                    this.props.history.push("/");
                }

                else{

                    this.props.history.push("/Error");

                }
            });
    };

    render() {
        return (

            <div className="container-fluid">

                <Route exact path="/" render={() => (
                    <SignIn message={this.state.signInMessage} username={this.state.username} handleSignIn={this.handleSignIn} />
                )}/>

                <Route exact path="/SignUp" render={() => (
                    <SignUp message={this.state.signUpMessage} username={this.state.username} handleSignUp={this.handleSignUp} />
                )}/>

                <Route exact path="/SignIn" render={() => (
                    <SignIn message={this.state.signInMessage} username={this.state.username} handleSignIn={this.handleSignIn} />
                )}/>

                <Route exact path="/HomePage" render={() => (
                    <Homepage email={this.state.email} username={this.state.username} handleIsSignedIn={this.handleIsSignedIn} handleSignOut={this.handleSignOut} />
                )}/>

                <Route exact path="/SharedFiles" render={() => (
                    <SharedFiles email={this.state.email} username={this.state.username}  handleIsSignedIn={this.handleIsSignedIn} handleSignOut={this.handleSignOut} />
                )}/>

                <Route exact path="/Groups" render={() => (
                    <Groups email={this.state.email} username={this.state.username}  handleIsSignedIn={this.handleIsSignedIn} handleSignOut={this.handleSignOut} />
                )}/>

                <Route exact path="/Activity" render={() => (
                    <Activity email={this.state.email} username={this.state.username}  handleIsSignedIn={this.handleIsSignedIn} handleSignOut={this.handleSignOut} />
                )}/>

                <Route exact path="/Profile" render={() => (
                    <Profile email={this.state.email} username={this.state.username}  handleIsSignedIn={this.handleIsSignedIn} handleSignOut={this.handleSignOut} />
                )}/>

                <Route exact path="/Error" render={() => (
                    <Error/>
                )}/>

            </div>

        );
    }

}

export default withRouter(RoutingComponent);