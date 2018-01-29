import React from 'react';
import styled from "styled-components";

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    
    let location = props.routeProps.match.url;
    let index = location.lastIndexOf("category/");
    let parentId = location.substring(index+9);
    this.state = {
      parentCategory: parentId,
      value: ""
    };
    
    this.onValueChange = this.onValueChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps (props) {
    let location = props.routeProps.match.url;
    let index = location.lastIndexOf("category/");
    let parentId = location.substring(index+9);
    this.setState ({
      parentCategory: parentId,
    })
  }
  
  onValueChange(e) {
    this.setState({value: e.target.value});
  }
  
  onSubmit (e) {
    e.preventDefault();
    if (!this.input.value.trim()) {
      return;
    }
    this.props.onSubmit(this.input.value, this.state.parentCategory);
    this.input.value = '';
    this.setState({value: ""});
  }

  render() {
    return (
        <form onSubmit={this.onSubmit}>
          <input type="text" ref={function(node) {
            this.input = node
          }.bind(this)} value={this.state.value} onChange={this.onValueChange}/>
          <input type="submit" value="Add Task"/>
        </form>
    );
  }
}

export default TaskForm;