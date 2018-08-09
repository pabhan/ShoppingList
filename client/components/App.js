//client/components/App.js
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Add from './Add';
import Update from './Update';
import Delete from './Delete';
export default class App extends React.Component {
constructor() {
    super();
    this.state = {selectedName:'Item', selectedQuantity: 1, data: []};
    this.getData = this.getData.bind(this);
  }
componentDidMount() {
    this.getData(this, '1');
  }
  componentWillReceiveProps(nextProps) {
    this.getData(this, '1');
  }
getData(ev,data){
    axios.get('/getAll')
      .then(function(response) {
        ev.setState({data: response.data});
        ev.setState({selectedQuantity: parseInt(data)})
      });
  }
render() {
    return (
      <div>
      <Add selectedName={this.state.selectedName} selectedQuantity={this.state.selectedQuantity} />
        <table>
          <thead>
            <tr><th></th><th className='desc-col'>Name</th><th className='button-col'>Quantity</th><th className='button-col'>Update</th><th className='button-col'>Delete</th></tr>
          </thead>
          <tbody>
            {
              this.state.data.map(function(it){
                return  <tr><td className='counterCell'></td><td className='desc-col'>{it.name}</td><td className='button-col'>{it.quantity}</td><td className='button-col'><Update item={it} /></td><td className='button-col'><Delete id={it._id} item={it} /></td></tr>
              })
            }
            </tbody>
          </table>
      </div>
    );
  }
}
