import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class EditChocolatModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      title: props.chocolate.title,
     description: props.chocolate.description
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleChange = (e) => {
      this.setState({
          [e.currentTarget.name] : e.currentTarget.value
      })
  }

  handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Ready to Update")
        //newerror says this.props.updateChocolate is not a function 
        const validUpdate = await this.props.updateChocolat(this.props.chocolate._id, this.state)
        //make sure the above works before you do this.toggle
        if(validUpdate){
          this.toggle();
        }
  }

  render() {
    return (
      <div>
        <Button color="success" onClick={this.toggle}>Edit Description: {this.props.chocolate.description}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Update Chocolate {this.props.chocolate.title}</ModalHeader>
          <ModalBody>
              <form onSubmit={this.handleSubmit}>
                  Title: <input type="text" name="title" onChange={this.handleChange} value={this.state.title} /> <br></br>
                  Description: <input type="text" name="description" onChange={this.handleChange} value={this.state.description} />
              </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSubmit}>Edit Chocolate</Button>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EditChocolatModal;