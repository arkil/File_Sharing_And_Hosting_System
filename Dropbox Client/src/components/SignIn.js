import React,{Component} from 'react';
import { withRouter } from 'react-router-dom';
import dropbox_name from './dropbox_.jpg';
import dropbox_logo from './dropbox_logo_.jpg';
// import PropTypes from 'prop-types';

class SignIn extends Component{

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            message: '',
        };
    }

    componentWillMount(){
        if(this.props.username !== undefined){
            this.props.history.push("/HomePage");
        }
    }

    render() {

        console.log("In RENDER SignIn");

        return (

            <div className="container-fluid">

                <br/>

                <img src={dropbox_logo} alt={"Not available"}/>

                &nbsp; &nbsp; &nbsp;

                <img src={dropbox_name} alt={"Not available"}/>

                <hr style={{height:'10px', border: '0',boxShadow: '0 10px 10px -10px #8c8b8b inset',}}/>

                <div className="row justify-content-md-center">

                    <div className="span3">

                        <form>

                            <br/> <br/>

                            <div className="form-group">
                                <h2>Sign In</h2>
                            </div>

                            <div className="col-md-12">
                                {this.props.message && (
                                    <div  className="alert alert-warning" role="alert">
                                        {this.props.message}
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Email *</label>
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                <input
                                    type="email"
                                    name="email"
                                    className="span3"
                                    placeholder="Enter Email Address"
                                    required="required"
                                    value={this.state.username}
                                    autoFocus="autoFocus"
                                    onChange={(event) => {
                                        this.setState({
                                                ...this.state,
                                            username: event.target.value
                                        });
                                    }}
                                />
                            </div>

                            <div className="form-group">
                                <label>Password *</label>
                                &nbsp; &nbsp; &nbsp; &nbsp;
                                <input
                                    type="password"
                                    name="password"
                                    className="span3"
                                    placeholder="Enter Password"
                                    required="required"
                                    value={this.state.password}
                                    onChange={(event) => {
                                        this.setState({
                                                ...this.state,
                                                password: event.target.value
                                        });
                                    }}
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="button"
                                    value="Sign In"
                                    className="btn btn-primary"
                                    style={{float: 'right'}}
                                    onClick={() => this.props.handleSignIn(this.state)}

                                />
                                <input
                                    type="button"
                                    value="Sign Up"
                                    className="btn btn-primary"
                                    style={{float: 'left'}}
                                    onClick={() => {
                                        this.props.history.push("/SignUp");
                                    }}
                                />
                            </div>

                        </form>



                    </div>
                </div>
            </div>

        );

    }
}

export default withRouter(SignIn);