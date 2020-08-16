import React from 'react'
import './App.css'
import ChocolatContainer from './ChocolatContainer/ChocolatContainer'
// import ChocolatList from './ChocolatList/ChocolatList'
import Login from './AuthGateway/Login/Login'
import Register from './AuthGateway/Register/Register'
import AuthGateway from './AuthGateway/AuthGateway'

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      loggedIn: false,
      // username: null
      username: null,
      // password:null
    }
  }

  // ********************* REGISTER *******************************
  //Changing state:
  //(1) Create the function in the parent (handleRegister), (2) pass to Login who is an immediate child(down below)
handleRegister = async (formData) =>{
  console.log("registering")
  console.log(formData)
  //look in the usercontroller and see where usercontroller is 
  //we are going to communicate with the server here
  const registerResponse = await fetch("http://localhost:9000/api/v1/user/register", {
    //fetch call boilerplate
    method: "POST",
    body: JSON.stringify(formData),
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  })
  const parsedResponse = await registerResponse.json()
   console.log(parsedResponse);
   if(parsedResponse.status.code === 201){
    console.log("successful registration")
    //we can change state now since login was successful, so user can come on in 
    this.setState({
      loggedIn: true,
      username: parsedResponse.data.username
    })
   
  }
  
}



// ******************************** LOGIN **********************

handleLogin = async (formData) =>{
  console.log("logging in")
  console.log(formData)
  //look in the usercontroller and see where usercontroller is 
  //we are going to communicate with the server here
  const registerResponse = await fetch("http://localhost:9000/api/v1/user/login", {
    //fetch call boilerplate
    method: "POST",
    body: JSON.stringify(formData),
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  })
  const parsedResponse = await registerResponse.json()
   console.log(parsedResponse);
   if(parsedResponse.status.code === 200){
    console.log("successful login")
    //we can change state now since login was successful, so user can come on in 
    this.setState({
      loggedIn: true,
      username: parsedResponse.data.username
    })
   }
}
//include ternary---true, show chocolate container--- if false, show Login page
  render(){
    return (
   
    <div className="App">
      {
        this.state.loggedIn ?
        <ChocolatContainer/> :
        <AuthGateway handleLogin={this.handleLogin} handleRegister={this.handleRegister}/>
      }
   
     {/* <Login handleRegister={this.props.handleRegister}/> */}
    {/* <Login handleRegister={this.handleRegister}/> */}
      {/* <ChocolatList/> */}
    <div>
{/*            
  <Footer/> */}
          
   </div>
     
  </div>  
       )
    }
  }

 export default App;