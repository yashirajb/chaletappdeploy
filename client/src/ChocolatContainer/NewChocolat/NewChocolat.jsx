import React, {Component} from 'react'

class NewChocolat extends Component {
    constructor(){
        super();
        this.state = {
           title: "",
           description: "",
           price: Number,
           rating: Number,
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        //Below when enacted comes from ChocolatContainer as passed down into the NewChocolat component
        this.props.createChocolat(this.state)
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
           
           <h4>Suggest a Chocolate</h4>
           <br></br>
           <div className="newTitle">
           <label htmlFor="Title">Title</label>
           <div className="newTitleInput">
           <input type="text" name="title" onChange={this.handleChange}/>
           </div>
         </div>
           <div className="newDescription">
           <label htmlFor="Description">Description</label>
           <div className="newDescriptionInput">
           <input type="text" name="description" onChange={this.handleChange}/>
           </div>
           </div>
           <div className="newPrice">
           <label htmlFor="Price">Price</label>
           <div className="newPriceInput">
           <input type="text" name="price" onChange={this.handleChange}/>
           </div>
         </div>
           <div className="newRating">
           <label htmlFor="Rating">Rating</label>
           <div className="newRatingInput">
           <input type="text" name="rating" onChange={this.handleChange}/>
           </div>
           </div>
           <div className="submitSuggestion">
           <input type="submit" value="Submit Suggestion" />
           </div>
           <br></br>
            </form>
        )
    }
}

export default NewChocolat;