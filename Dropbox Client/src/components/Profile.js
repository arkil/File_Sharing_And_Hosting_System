import React,{Component} from 'react';
import withRouter from "react-router-dom/es/withRouter";
import dropbox_name from './dropbox_.jpg';
import dropbox_logo from './dropbox_logo_.jpg';
import * as API_GetProfile from "../api/API_GetProfile";
import * as API_EditProfile from "../api/API_EditProfile";

class Profile extends Component{

    constructor(props) {
        super(props);
        this.state = {
            email: this.props.email,
            username: this.props.username,
            Username: '',
            Firstname: '',
            Lastname: '',
            Overview: '',
            Work: '',
            Education: '',
            ContactNumber: '',
            message:''
        };
    }

    componentWillMount(){
        console.log("In will mount");
        // API_GetProfile.getProfile()
        //     .then((data) => {
        //         console.log(data.Firstname+" "+data.Lastname+" "+data.Overview);
        //         this.setState({
        //             ...this.state,
        //             Username: data.profile.Username,
        //             Firstname: data.profile.Firstname,
        //             Lastname: data.profile.Lastname,
        //             Overview: data.profile.Overview,
        //             Work: data.profile.Work,
        //             Education: data.profile.Education,
        //             ContactNumber: data.profile.ContactNumber
        //         });
        //     });
    }

    componentDidMount(){
        console.log("In did mount");
        // API_GetProfile.getProfile()
        //     .then((data) => {
        //         console.log(data.Firstname+" "+data.Lastname+" "+data.Overview);
        //         this.setState({
        //             ...this.state,
        //             Username: data.profile.Username,
        //             Firstname: data.profile.Firstname,
        //             Lastname: data.profile.Lastname,
        //             Overview: data.profile.Overview,
        //             Work: data.profile.Work,
        //             Education: data.profile.Education,
        //             ContactNumber: data.profile.ContactNumber
        //         });
        //     });
    }

    handleEditProfile = () => {
        console.log("In edit profile");
        // API_EditProfile.editProfile(this.state)
        //     .then((res)=>{
        //         this.setState({
        //             ...this.state,
        //             message: "Profile edited."
        //         });
                // API_GetProfile.getProfile()
                //     .then((data) => {
                //         console.log(data);
                //         this.setState({
                //             ...this.state,
                //             Username: data.profile.Username,
                //             Firstname: data.profile.Firstname,
                //             Lastname: data.profile.Lastname,
                //             Overview: data.profile.Overview,
                //             Work: data.profile.Work,
                //             Education: data.profile.Education,
                //             ContactNumber: data.profile.ContactNumber
                //         });
                //     });
            // });
    };

    pushTo = (page) => {

        console.log("In pushTo "+ page);
        switch(page) {
            case "Home":
                console.log(page);
                this.props.history.push("/HomePage");
                break;
            case "SharedFiles":
                console.log(page);
                this.props.history.push("/SharedFiles");
                break;
            case "Groups":
                console.log(page);
                this.props.history.push("/Groups");
                break;
            case "Activity":
                console.log(page);
                this.props.history.push("/Activity");
                break;
            case "Profile":
                console.log(page);
                this.props.history.push("/Profile");
                break;
            default:
        }
    };

    render(){

        console.log("In RENDER SignUp");

        return(

            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-3 col-md-2 sidebar">

                        <hr style={{height:'10px', border: '0',boxShadow: '0 10px 10px -10px #8c8b8b inset',}}/>

                        <input
                            type="button"
                            value="Sign Out"
                            className="btn btn-primary"
                            onClick={this.props.handleSignOut}
                        />

                        <hr style={{height:'10px', border: '0',boxShadow: '0 10px 10px -10px #8c8b8b inset',}}/>

                        <button className="btn" onClick={() => this.pushTo("Home")}>Home</button>

                        <hr style={{height:'10px', border: '0',boxShadow: '0 10px 10px -10px #8c8b8b inset',}}/>

                        <button className="btn" onClick={() => this.pushTo("Files")}>Shared Files</button>

                        <hr style={{height:'10px', border: '0',boxShadow: '0 10px 10px -10px #8c8b8b inset',}}/>

                        <button className="btn" onClick={() => this.pushTo("Groups")}>Groups</button>

                        <hr style={{height:'10px', border: '0',boxShadow: '0 10px 10px -10px #8c8b8b inset',}}/>

                        <button className="btn" onClick={() => this.pushTo("Activity")}>Activity</button>

                        <hr style={{height:'10px', border: '0',boxShadow: '0 10px 10px -10px #8c8b8b inset',}}/>

                        <button className="btn" onClick={() => this.pushTo("Profile")}>Profile</button>

                        <hr style={{height:'10px', border: '0',boxShadow: '0 10px 10px -10px #8c8b8b inset',}}/>

                    </div>
                    <div className="col-sm-9 col-md-10 main"  style={{float: 'left'}}>

                        <br/>

                        <img src={dropbox_logo} alt={"Not available"}/>

                        &nbsp; &nbsp; &nbsp;

                        <img src={dropbox_name} alt={"Not available"}/>

                        <hr style={{height:'10px', border: '0',boxShadow: '0 10px 10px -10px #8c8b8b inset',}}/>

                        <h2 className="page-header">

                            Welcome, {this.props.username}

                        </h2>

                        <br/>

                        <br/> <br/>

                        <form>

                            <div className="form-group">
                                <h2>{this.props.username}'s Profile</h2>
                            </div>

                            <div className="col-md-12">
                                {this.state.message && (
                                    <div  className="alert alert-success" role="alert">
                                        {this.state.message}
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <label>First Name </label>
                                &nbsp; &nbsp; &nbsp;
                                <input
                                    type="name"
                                    name="firstname"
                                    className="span3"
                                    placeholder="Enter First Name"
                                    value={this.state.Firstname}
                                    onChange={ (event) => {
                                        this.setState({
                                            ...this.state,
                                            Firstname: event.target.value
                                        });
                                    }}
                                />
                            </div>

                            <div className="form-group">
                                <label>Last Name </label>
                                &nbsp; &nbsp; &nbsp;
                                <input
                                    type="name"
                                    name="lastname"
                                    className="span3"
                                    placeholder="Enter Last Name"
                                    value={this.state.Lastname}
                                    onChange={ (event) => {
                                        this.setState({
                                            ...this.state,
                                            Lastname: event.target.value
                                        });
                                    }}
                                />
                            </div>

                            <div className="form-group">
                                <label>Overview </label>
                                &nbsp; &nbsp; &nbsp;
                                <input
                                    type="name"
                                    name="Overview"
                                    className="span3"
                                    placeholder="Enter Overview"
                                    value={this.state.Overview}
                                    onChange={ (event) => {
                                        this.setState({
                                            ...this.state,
                                            Overview: event.target.value
                                        });
                                    }}
                                />
                            </div>

                            <div className="form-group">
                                <label>Work</label>
                                &nbsp; &nbsp; &nbsp;
                                <input
                                    type="name"
                                    name="Work"
                                    className="span3"
                                    placeholder="Enter Work"
                                    value={this.state.Work}
                                    onChange={ (event) => {
                                        this.setState({
                                            ...this.state,
                                            Work: event.target.value
                                        });
                                    }}
                                />
                            </div>

                            <div className="form-group">
                                <label>Education </label>
                                &nbsp; &nbsp; &nbsp;
                                <input
                                    type="name"
                                    name="Education"
                                    className="span3"
                                    placeholder="Enter Education"
                                    value={this.state.Education}
                                    onChange={ (event) => {
                                        this.setState({
                                            ...this.state,
                                            Education: event.target.value
                                        });
                                    }}
                                />
                            </div>

                            <div className="form-group">
                                <label>ContactNumber</label>
                                &nbsp; &nbsp; &nbsp;
                                <input
                                    type="number"
                                    name="ContactNumber"
                                    className="span3"
                                    placeholder="Enter Contact Number"
                                    value={this.state.ContactNumber}
                                    onChange={ (event) => {
                                        this.setState({
                                            ...this.state,
                                            ContactNumber: event.target.value
                                        });
                                    }}
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="button"
                                    value="Edit Profile"
                                    className="btn btn-primary"
                                    onClick={() => this.handleEditProfile()}
                                />
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        );

    }


}

export default withRouter(Profile);