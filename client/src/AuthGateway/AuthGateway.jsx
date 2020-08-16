import React, {Component} from 'react'
import Register from './Register/Register';
import Login from './Login/Login'
import Jumbo from '../Style/Jumbotron'

///this component allows user to either login or register

class AuthGateway extends Component {
    constructor(){
        super();
    }
    render(){
        return(
            <div>
                <h1>Chalet du Chocolat</h1>
                <h4>A Swiss-French Chocolatier</h4>
               <div>
                   <Jumbo/>
               </div>
                <h1>Register as a New User</h1>
                <Register handleRegister={this.props.handleRegister}/>
                <h1>Login</h1>
                <Login handleLogin={this.props.handleLogin} />
            </div>
        )
    }
}

export default AuthGateway;