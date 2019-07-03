import React,{Component} from 'react';
import withRouter from "react-router-dom/es/withRouter";
import dropbox_name from './dropbox_.jpg';
import dropbox_logo from './dropbox_logo_.jpg';
// import PropTypes from 'prop-types';

class SignUp extends Component{

    // static propTypes = {
    //     handleSignUp: PropTypes.func.isRequired,
    // };

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            overview: '',
            work: '',
            education:'',
            contactInfo:'',
            lifeEvents:''
        };
    }

    componentWillMount(){
    }

    render(){

        console.log("In RENDER SignUp");

            return(

                <div className="container-fluid">

                    <br/>

                    <img src={dropbox_logo} alt={"Not available"}/>

                    &nbsp; &nbsp; &nbsp;

                    <img src={dropbox_name} alt={"Not available"}/>

                    <hr style={{height:'10px', border: '0',boxShadow: '0 10px 10px -10px #8c8b8b inset',}}/>

                    <div className="row justify-content-md-center">
                <div className="span3">

                    <br/> <br/>

                    <form>

                        <div className="form-group">
                            <h2>Sign Up</h2>
                        </div>

                        <div className="col-md-12">
                            {this.props.message && (
                                <div  className="alert alert-warning" role="alert">
                                    {this.props.message}
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label>First Name *</label>
                            &nbsp; &nbsp; &nbsp;
                            <input
                                type="name"
                                name="firstname"
                                className="span3"
                                placeholder="Enter First Name"
                                autoFocus="autoFocus"
                                value={this.state.firstName}
                                onChange={ (event) => {
                                    this.setState({
                                            ...this.state,
                                            firstName: event.target.value
                                    });
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <label>Last Name *</label>
                            &nbsp; &nbsp; &nbsp;
                            <input
                                type="name"
                                name="lastname"
                                className="span3"
                                placeholder="Enter Last Name"
                                required="required"
                                value={this.state.lastName}
                                onChange={ (event) => {
                                    this.setState({
                                            ...this.state,
                                            lastName: event.target.value
                                    });
                                }}
                            />
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
                                value={this.state.email}
                                onChange={ (event) => {
                                    this.setState({
                                            ...this.state,
                                            email: event.target.value
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
                                onChange={ (event) => {
                                    this.setState({
                                            ...this.state,
                                            password: event.target.value
                                    });
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <label>Work</label>
                            &nbsp; &nbsp; &nbsp;
                            <input
                                type="name"
                                name="work"
                                className="span3"
                                placeholder="Enter Work Info"
                                autoFocus="autoFocus"
                                value={this.state.work}
                                onChange={ (event) => {
                                    this.setState({
                                            ...this.state,
                                            work: event.target.value
                                    });
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <label>Overview</label>
                            &nbsp; &nbsp; &nbsp;
                            <input
                                type="name"
                                name="overview"
                                className="span3"
                                placeholder="Enter Overview"
                                autoFocus="autoFocus"
                                value={this.state.overview}
                                onChange={ (event) => {
                                    this.setState({
                                            ...this.state,
                                            overview: event.target.value
                                    });
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <label>Education</label>
                            &nbsp; &nbsp; &nbsp;
                            <input
                                type="name"
                                name="education"
                                className="span3"
                                placeholder="Enter Education"
                                autoFocus="autoFocus"
                                value={this.state.education}
                                onChange={ (event) => {
                                    this.setState({
                                            ...this.state,
                                            education: event.target.value
                                    });
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <label>Contact Info</label>
                            &nbsp; &nbsp; &nbsp;
                            <input
                                type="name"
                                name="contactInfo"
                                className="span3"
                                placeholder="Enter Contact Info"
                                autoFocus="autoFocus"
                                value={this.state.contactInfo}
                                onChange={ (event) => {
                                    this.setState({
                                            ...this.state,
                                        contactInfo: event.target.value
                                    });
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <label>Life Events</label>
                            &nbsp; &nbsp; &nbsp;
                            <input
                                type="name"
                                name="lifeEvents"
                                className="span3"
                                placeholder="Enter Life Events"
                                autoFocus="autoFocus"
                                value={this.state.lifeEvents}
                                onChange={ (event) => {
                                    this.setState({
                                            ...this.state,
                                        lifeEvents: event.target.value
                                    });
                                }}
                            />
                        </div>


                        <div className="form-group">
                            <input
                                type="button"
                                value="Sign up"
                                className="btn btn-primary"
                                style={{float: 'right'}}
                                onClick={() => this.props.handleSignUp(this.state)}
                            />
                            <input
                                type="button"
                                value="Sign In"
                                className="btn btn-primary"
                                style={{float: 'left'}}
                                onClick={() => {
                                    this.props.history.push("/SignIn");
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

export default withRouter(SignUp);