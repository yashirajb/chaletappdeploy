import React from 'react';
import { Jumbotron, Container } from 'reactstrap';

const Jumbo = (props) => {
  return (
    <div>
      <Jumbotron fluid>
        <Container fluid>
          <div>
            <div className="chaletImage">
          <img src="https://i.imgur.com/ZWLdtD3l.jpg" title="source: imgur.com" />  
          </div>        
          </div>
          {/* <h1 className="display-3">Fluid jumbotron</h1>
          <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p> */}
        </Container>
      </Jumbotron>
    </div>
  );
};

export default Jumbo;