import React,{Component} from 'react';
import { withRouter } from 'react-router-dom';

class Error extends Component{

    render() {

        console.log("In RENDER Error");

        return (

            <div className="container-fluid">

                <p> Server crashed with some error. </p>

                <p> Click below button to signIn again. </p>

                <input
                    type="button"
                    value="Sign In"
                    className="btn btn-primary"
                    onClick={() => {
                        this.props.history.push("/SignIn");
                    }}
                />

            </div>

        );

    }
}

export default withRouter(Error);