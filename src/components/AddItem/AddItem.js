import React, {Component} from 'react';
import './AddItem.css';

export default class AddItem extends Component {
  constructor() {
    super();
    this.state = { label: ''};
  }

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onAdd(this.state.label);
    this.setState({
      label: ''
    });
  };

  render() {

    return(
      <form
        className='item-add-form d-flex'
        onSubmit={this.onSubmit}
      >
        <input
          type='text'
          className='form-control'
          placeholder='What needs to be done'
          style={{ marginRight: '3px' }}
          onChange={this.onLabelChange}
          value={this.state.label}
        />
        <button className='btn btn-outline-secondary'>
          Add Item
        </button>
      </form>
    )
  }
}