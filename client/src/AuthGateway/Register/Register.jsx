import React, {Component} from 'react'


//this component will receive a form, so it'll be a form component controlled by state
//will also include handleChange and handleSubmit
class Register extends Component {
    constructor(){
        super();
        this.state = {
            username: null,
            password: null
      
        }
    }
    handleChange = (e) => {
        this.setState({
//             [e.target.name] : e.target.value
// ******* added instead ******
                [e.currentTarget.name] : e.currentTarget.value
        })

//         console.log(e.currentTarget.value)
//******* added instead ******
         console.log(this.state)
      
    }

//     //register function comes from the parent
    handleSubmit = (e) => {
        e.preventDefault();
        console.log("form submitted")
        this.props.handleRegister(this.state)
    }

    //registration will change state
    //on submit we will call handleSubmit
    //Remember this form portion also has to match up with the User model (which currently contains username and password)
    //dont forget to add onChange LISTENERS and SUBMIT button! 
    render(){
        console.log("This is the register form I need to work")
        return(
            <form onSubmit= {this.handleSubmit}>
                username: <input type="text" name="username" onChange={this.handleChange}/> <br></br>
                password: <input type="password" name="password"  onChange={this.handleChange}/> <br></br> 
              <br></br>
<br></br>
                <input type="submit" value="Register"/>
            </form>
        )
    }
}

export default Register;