import React from 'react';
import EditChocolatModal from './EditChocolatModal/EditChocolatModal';


function ChocolatList(props){
//  //uses map function to create an array of returned items
    const chocolates = props.chocolates.map(function(chocolate){
        return(
            <li key={chocolate._id}>
                <h2>{chocolate.title}</h2> 
                <h3>{chocolate.description}</h3>
                <h5>{chocolate.price}</h5>
                <h6>{chocolate.rating}</h6> 
                {/* if you just put chocolate.user it will return a big object and will throw an error, you have to break it down further, to user.username */}
                {/* <h6>Uploaded By: {chocolate.user}</h6> */}
                <br></br>
                <div className="editChocolate">
             <EditChocolatModal chocolate={chocolate} updateChocolat={props.updateChocolat}/>
                </div>
             <br></br>
             <div className="deleteChocolate">
                <button onClick={()=>{props.deleteChocolat(chocolate._id)
                }}>Delete Chocolate</button>
                </div>
                
                  <br></br>
        </li>
)
    })
    return(
        <ul>
    
          <img src="https://i.imgur.com/Aqg2GZAm.jpg" title="source: imgur.com" />
            {chocolates}
        </ul>
    )
}

export default ChocolatList;