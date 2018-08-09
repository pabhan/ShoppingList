//client/components/Update.js
import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
var querystring = require('querystring');
class Update extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      name: '',
      quantity: '',
      messageFromServer: '',
      modalIsOpen: false
    }
this.update = this.update.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
}
componentDidMount() {
    this.setState({
      id: this.props.item._id,
      name: this.props.item.name,
      quantity: this.props.item.quantity
    });
  }
openModal() {
    this.setState({
      modalIsOpen: true
    });
  }
closeModal() {
    this.setState({
      modalIsOpen: false,
      messageFromServer: ''
    });
  }

handleTextChange(e) {
    if (e.target.name == "name") {
      this.setState({
        name: e.target.value
      });
    }
if (e.target.name == "quantity") {
      this.setState({
        quantity: e.target.value
      });
    }
  }
onClick(e) {
    this.update(this);
  }
update(e) {
    axios.post('/update',
      querystring.stringify({
        _id: e.state.id,
        name: e.state.name,
        quantity: e.state.quantity
      }), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(function(response) {
      e.setState({
        messageFromServer: response.data
      });
});
  }
render() {
    if(this.state.messageFromServer == ''){
      return (
        <div>
          <Button bsStyle="warning" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-edit"></span></Button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="Add Item"
            className="Modal">
<Link to={{pathname: '/', search: '' }} style={{ textDecoration: 'none' }}>
            <Button bsStyle="danger" bsSize="xs" onClick={this.closeModal}><span className="closebtn glyphicon glyphicon-remove"></span></Button>
          </Link><br/>
<fieldset>
            <label htmlFor="name">Name:</label><input type="text" id="name" name="name" value={this.state.name} onChange={this.handleTextChange}></input>
            <label htmlFor="quantity">Quantity:</label><input type="number" id="quantity" name="quantity" value={this.state.quantity} onChange={this.handleTextChange}></input>
</fieldset>
<div className='button-center'>
              <br/>
              <Button bsStyle="warning" bsSize="small" onClick={this.onClick}>Update</Button>
            </div>
          </Modal>
        </div>
      )
    }
    else{
      return (
        <div>
         <Button bsStyle="warning" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-edit"></span></Button>
         <Modal
           isOpen={this.state.modalIsOpen}
           onAfterOpen={this.afterOpenModal}
           onRequestClose={this.closeModal}
           contentLabel="Add Item"
           className="Modal">
<div className='button-center'>
              <h3>{this.state.messageFromServer}</h3>
              <Link to={{pathname: '/', search: '' }} style={{ textDecoration: 'none' }}>
                <Button bsStyle="success" bsSize="xs" onClick={this.closeModal}>Close the Dialog</Button>
              </Link>
            </div>
          </Modal>
        </div>
        )
      }
  }
}
export default Update;
