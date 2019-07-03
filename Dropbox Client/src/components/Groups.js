import React,{Component} from 'react';
import { withRouter } from 'react-router-dom';
import * as API_AddGroupMemeber from '../api/API_AddGroupMember';
import * as API_ from '../api/API_CreateGroup';
import * as API_UploadFile from '../api/API_UploadFile';
import * as API_CreateFolder from '../api/API_CreateFolder';
import * as API_GetFiles from '../api/API_GetFiles';
import * as API_StarAction from '../api/API_StarAction';
import * as API_DeleteDoc from "../api/API_DeleteDoc";
import * as API_IsSignedIn from "../api/API_IsSignedIn";
import * as API_ShareDoc from "../api/API_ShareDoc";
import * as API_UnShareDoc from "../api/API_UnShareDoc";
import dropbox_name from './dropbox_.jpg';
import dropbox_logo from './dropbox_logo_.jpg';
import strImg from '../components/stared.jpg';
import unstrImg from '../components/unstared.png';
import file from '../components/file.png';
import folder from '../components/folder.png';
import deleteFile from '../components/delete.png';
import shareDoc from "../components/share.png";

class Groups extends Component{

    constructor(props) {
        super(props);
        this.st = {currentPath: './public/upload/'+ this.props.email +'/'};
        this.state = {
            userData: {
                email: this.props.email,     // problem
                username: '',
                user_docs: [{id: 5,name:"GroupSharedFolder",owner:"abc",path:"\\src\\public\\upload\\abc\\",sharedWith:"N/A",star:false,type:"folder"},{id: 4,name:"lamborgini.png",owner:"xyz",path:"\\src\\public\\upload\\xyz\\",sharedWith:"N/A",star:false,type:"file"}]
            },
            message: '',
            foldername : '',
            currentPath : './public/upload/'+ this.props.email +'/'
        };
    }

    componentWillMount(){

        console.log("In IsSignedIn request of willMount");

        // API_IsSignedIn.checkIsSignedIn()
        //     .then((status) => {
        //
        //             if(status === 200){
        //                 console.log("User is authorized to access this page");
        //             }
        //             else{
        //                 this.props.history.push("/SignIn");
        //             }
        //
        //         }
        //     );
    }

    componentDidMount() {

        let state = this.state;
        console.log("In Did Mount "+state.currentPath+" email "+ this.props.email );

        API_GetFiles.getDocs(state)
            .then((data) => {
                console.log(data);
                this.setState({
                    ...this.state,
                    user_docs: data
                });
            });
    };

    handleStarAction = (doc) => {
        API_StarAction.starAction(doc)
            .then(() => {
                API_GetFiles.getDocs(this.st)
                    .then((data) => {
                        console.log(data);
                        this.setState({
                            ...this.state,
                            user_docs: data
                        });
                    });
            });
    };

    handleDelete = (doc) => {

        console.log(doc);

        if (doc.type === "folder") {

            API_DeleteDoc.deleteFolder(doc)
                .then((res) => {
                    API_GetFiles.getDocs(this.st)
                        .then((data) => {
                            console.log(data);
                            this.setState({
                                ...this.state,
                                user_docs: data
                            });
                        });
                });
        }


        else if (doc.type === "file") {
            API_DeleteDoc.deleteFile(doc)
                .then((res) => {
                    API_GetFiles.getDocs(this.st)
                        .then((data) => {
                            console.log(data);
                            this.setState({
                                ...this.state,
                                user_docs: data
                            });
                        });
                });
        }
    };

    navigateFolder = (event) => {
        console.log("In navigateFolder");

        console.log("In navigate :"+this.st.currentPath);

        let folder = event.target.value;
        let navigationPath = this.st.currentPath+folder +"/";
        this.st = {currentPath: navigationPath};
        console.log("New Path"+ navigationPath);
        console.log("In Navigate Folder "+this.st.currentPath);
        API_GetFiles.getDocs(this.st)
            .then((data) => {
                console.log(data);
                this.setState({
                    ...this.state,
                    user_docs: data.docArr
                });
            });
    };

    navigateBackFolder = (st) => {
        let folder = st.currentPath;
        let parentFolder = folder.substr(0, folder.lastIndexOf('/'));
        console.log(parentFolder);
        st.currentPath = parentFolder.substr(0, parentFolder.lastIndexOf('/')) + "/";
        console.log("In navigate back"+st.currentPath);
        API_GetFiles.getDocs(st)
            .then((data) => {
                console.log(data);
                this.setState({
                    ...this.state,
                    user_docs: data.docArr
                });
            });
    };

    displayStar = (doc) => {
        console.log("Value of star is "+ doc.star+" doc : "+doc);
        if(doc.star === false){
            return (<img src={unstrImg} height={'30px'} width={'30px'} alt={'Not available'} onClick={() => this.handleStarAction(doc)}/>);
        }
        else{
            return (<img src={strImg} height={'30px'} width={'30px'} alt={'Not available'} onClick={() => this.handleStarAction(doc)}/>);
        }
    };

    displayIcon = (doc) => {

        if(doc.type === "folder") {

            return (<img src={folder} height={'30px'} width={'30px'} alt={'Not available'}/>);

        }
        else{

            return(<img src={file} height={'30px'} width={'30px'} alt={'Not available'}/>);

        }
    };

    displayDocument = (doc) => {
        if(doc.type === "folder"){
            return (
                <button type="button" className="btn btn-link" onClick = {(event) => this.navigateFolder(event)} value={doc.name} > {doc.name} </button>
            );
        }
        else{
            // let filePath = 'http://localhost:3004/'+doc.DocPath+doc.DocName;
            // filePath = filePath.replace("/public","");
            return(
                <a>
                    {doc.name}
                </a>
            );
        }
    };

    displayBackButtonLogic = () => {
        if(this.st.currentPath === './public/upload/'+ this.props.email +'/'){
            return;
        }
        else{
            return (
                <div>
                    Go Back :  <button type="button" className="btn btn-link" onClick = {() => this.navigateBackFolder(this.st)} > ... </button>
                </div>
            );
        }
    };

    displayDelete = (doc) => {

        return (<img src={deleteFile} height={'30px'} width={'30px'} alt={'Not available'} onClick={() => this.handleDelete(doc)}/>);

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

    render() {

        console.log("In RENDER HomePage");

        return (

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

                        <div className="form-group">
                            <label> Add Memeber *</label>
                            &nbsp; &nbsp; &nbsp;
                            <input
                                type="text"
                                name="folderName"
                                className="span3"
                                placeholder="Enter Member Name"
                                required="required"
                                autoFocus="autoFocus"
                                // onChange={(event) => {
                                //     this.setState({
                                //         ...this.state,
                                //         foldername: event.target.value
                                //     });
                                // }}
                            />
                        </div>

                        <input
                            type="button"
                            value="Add Member"
                            className="btn"
                            // onClick={this.handleFolderCreation}
                        />


                        <hr style={{height:'10px', border: '0',boxShadow: '0 10px 10px -10px #8c8b8b inset',}}/>

                        <div className="form-group">
                            <label> Group Name *</label>
                            &nbsp; &nbsp; &nbsp;
                            <input
                                type="text"
                                name="folderName"
                                className="span3"
                                placeholder="Enter Group Name"
                                required="required"
                                autoFocus="autoFocus"
                                // onChange={(event) => {
                                //     this.setState({
                                //         ...this.state,
                                //         foldername: event.target.value
                                //     });
                                // }}
                            />
                        </div>

                        <input
                            type="button"
                            value="Create Group"
                            className="btn"
                            // onClick={this.handleFolderCreation}
                        />

                        <hr style={{height:'10px', border: '0',boxShadow: '0 10px 10px -10px #8c8b8b inset',}}/>

                        <button className="btn" onClick={() => this.pushTo("Home")}>Home</button>

                        <hr style={{height:'10px', border: '0',boxShadow: '0 10px 10px -10px #8c8b8b inset',}}/>

                        <button className="btn" onClick={() => this.pushTo("SharedFiles")}>Shared Files</button>

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

                        <input
                            type="button"
                            value="CMPE 202"
                            className="btn"
                            // onClick={this.handleFolderCreation}
                        />

                        &nbsp; &nbsp; &nbsp; &nbsp;

                        <input
                            type="button"
                            value="CMPE 272"
                            className="btn"
                            // onClick={this.handleFolderCreation}
                        />

                        &nbsp; &nbsp; &nbsp; &nbsp;

                        <input
                            type="button"
                            value="CMPE 273"
                            className="btn"
                            // onClick={this.handleFolderCreation}
                        />

                        &nbsp; &nbsp; &nbsp; &nbsp;

                        <input
                            type="button"
                            value="CMPE 281"
                            className="btn"
                            // onClick={this.handleFolderCreation}
                        />

                        <h2 className="page-header">

                            Shared With Group - CMPE 273

                        </h2>

                        <br/>

                        <div className="table-responsive">

                            {this.displayBackButtonLogic()}

                            <br/>

                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th style={{textAlign: 'center'}}>Favorite</th>
                                    <th></th>
                                    <th style={{textAlign: 'center'}}>DocName</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.user_docs && (this.state.user_docs.map(doc => (
                                    <tr>
                                        <td>{this.displayStar(doc)}</td>
                                        <td>{this.displayIcon(doc)}</td>
                                        <td>{this.displayDocument(doc)}</td>
                                        <td>{this.displayDelete(doc)}</td>
                                    </tr>
                                )))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        );

    }

}

export default withRouter(Groups);