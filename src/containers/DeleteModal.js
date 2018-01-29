import React from 'react';
import { connect } from 'react-redux';
import { deleteCategory } from '../actions';
import { Route, Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import styled from "styled-components";

const mapDispatchToProps = dispatch => ({
  onDelete: (current) =>
    dispatch(deleteCategory(current))
});

class DeleteModal extends React.Component {
  constructor(props) {
    super(props);
    
    this.redirect=`/category/${props.current.id}`;
    this.onSubmit=this.onSubmit.bind(this);
    this.onClose=this.onClose.bind(this);
  }

  componentDidMount() {
    this.modalTarget = document.createElement('div');
    this.modalTarget.className = 'fade';
    document.body.appendChild(this.modalTarget);
    this._render();
  }

  onSubmit () {
    this.props.onDelete(this.props.current);
    this.redirect = this.props.current.parentId? `/category/${this.props.current.parentId}` : "/";
    this.onClose();
  }

  onClose(){
    this.props.history.push(this.redirect);
    ReactDOM.unmountComponentAtNode(this.modalTarget);
    document.body.removeChild(this.modalTarget);
  }

  _render() {
    let element = (
      <div className="modal">
          <p>{this.props.content}</p>
          <div className="button-line">
            <button onClick={this.onSubmit}>Yes</button>
            <button onClick={this.onClose}>No</button>
          </div>
      </div>
    );
    ReactDOM.render(element, this.modalTarget);
  }
  
  render() {
    return null;
  }
}

export default DeleteModal = connect(null, mapDispatchToProps)(DeleteModal);