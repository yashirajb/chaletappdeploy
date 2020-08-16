import React, {Component} from 'react'
import NewChocolat from './NewChocolat/NewChocolat'
import ChocolatList from './ChocolatList/ChocolatList'
import Jumbo from '../Style/Jumbotron'

//managing the state of all of our chocolates and have functionality to update that array all will live in chocolates container

class ChocolatContainer extends Component{
    constructor(){
        super()
        this.state = {
            chocolates: []
        }
    }

    //when the chocolates container gets mounted on the page for the first time we will call get.chocolates
    componentDidMount(){
        console.log("component is mounting")
        this.getChocolates();
    }


// ********************************** Delete Route ***********************************************


    deleteChocolat = async (id) => {
        console.log(id)

        try{
            //Using template brackets because we need to include the id of the rating we are deleting
            //making a fetch call to the express app
            const deleteChocolat = await fetch(`http://localhost:9000/api/v1/Chocolates/${id}`, {
            method: "DELETE",
            //ensures credential keeps getting passed between both sides
            credentials: "include"
        });
        const parsedResponse = await deleteChocolat.json()
        if(parsedResponse.status.code === 200){
            this.setState({
                chocolates: this.state.chocolates.filter(chocolate => chocolate._id !== id)
                // chocolates: this.state.chocolates.filter(function(chocolate){
                    // if(chocolate._id === id){
                    //     return false;
                    // }else{
                    //     return true;


                })
            }


        }catch(err){
            console.log(err)
        }
    }

    // ********************************** Create Route ***********************************************

    createChocolat = async (formData) => {
        console.log(formData)
        try{
            const newChocolat = await fetch("http://localhost:9000/api/v1/Chocolates", {
                method: "POST",
                //turning the form data into a string so we can send it to the server
                //we can't send objects, we have to convert to a string
                body: JSON.stringify(formData),
                 //ensures credential keeps getting passed between both sides
                //  these credentials will allow access to req.session.userId
                credentials: "include",
                //so body-parser can properly read through
                headers: {
                    "Content-Type": "application/json"
                }

            })
            //we expect our returned parsed response to be a chocolate with a user attached to it and put into state and state gets updated
            const parsedResponse = await newChocolat.json();
           if(parsedResponse.status.code === 201){
               this.setState({
                   //I want most recent chocolate at the top, so I've reversed the order
                //    chocolates: [parsedResponse.data, ...this.state.chocolates]
                   chocolates: [parsedResponse.data, ...this.state.chocolates]
               })
           }
        }catch(err){

        }
    }

    // //Make the request and then unpack the response



    // ********************************** Read Route ***********************************************


    getChocolates = async () => {
        try{
            const chocolates = await fetch("http://localhost:9000/api/v1/Chocolates")
            console.log(chocolates, 'chocolates')
                 //ensures credential keeps getting passed between both sides
            //     credentials: "include"
            // });

            const parsedResponse = await chocolates.json();
            console.log(parsedResponse)
            if(parsedResponse.status.code === 200){
            this.setState({
                chocolates : parsedResponse.data
            })
        }

     }catch(err){
            console.log(err);
        }       
       
    }

   // ********************************** Update Route ***********************************************
 
    updateChocolat = async (id, formData) => {
            try{
                const updatedChocolat = await fetch(`http://localhost:9000/api/v1/Chocolates/${id}`, {
                    method: "PUT",
                    body: JSON.stringify(formData),
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const parsedResponse = await updatedChocolat.json();
                console.log(parsedResponse)
                if(parsedResponse.status.code === 201){
                    //Update state with the new chocolate
                    this.setState({
                        chocolates: this.state.chocolates.map(function(chocolate){
                            if(chocolate._id !== id){
                                return chocolate
                            }else{
                                return parsedResponse.data
                            }
                        })
                    })
                    return true;
                }else{
                    return false;
                }

         }catch(err){
             console.log(err)
             return false;
         }
    }

    //this comes second when setting up the component
    render(){
        return(
            <div>
                 <div className="header">
                           <header className="navbar"></header>
            </div>
               <h1>Chalet du Chocolat</h1>
               <h4>A Swiss-French Chocolatier</h4>
               <br></br>
               <div>
                   <Jumbo/>
               </div>
               {/* When form submitted it will console log the formData above in createChocolat function */}
               <div className="addChocolate">
               <NewChocolat createChocolat={this.createChocolat}/>
               </div>
               <div className="listChocolate">
               <ChocolatList chocolates={this.state.chocolates} deleteChocolat={this.deleteChocolat} updateChocolat={this.updateChocolat} />
               </div>
               <div className="footer"></div>
            </div>
        )
    }
}

//this is third for set up 
export default ChocolatContainer;