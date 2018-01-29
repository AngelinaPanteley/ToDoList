import React from 'react';
import { Redirect } from 'react-router-dom';
import styled from "styled-components";

const StyledForm = styled.form`
  width: 100%;
`;

class CategoryForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.initialValue,
      current: props.current,
      redirect: props.redirectTo,
      redirectFlag: false
    };
    
    this.onValueChange = this.onValueChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  onValueChange(e) {
    this.setState({value: e.target.value});
  }
  
  onSubmit (e) {
    e.preventDefault();
    if (!this.input.value.trim()) {
      return;
    }
    this.props.onSubmit(this.input.value, this.state.current, this.props.id);
    this.input.value = '';
    this.setState({
      redirectFlag:true,
      value: "",
    });
  }

  render() {
    return (
        <StyledForm onSubmit={this.onSubmit}>
          <input type="text" ref={function(node) {
            this.input = node
          }.bind(this)} value={this.state.value} onChange={this.onValueChange}/>
          <input type="submit" value={this.props.buttonValue}/>
          {this.state.redirectFlag && this.state.redirect && <Redirect to={this.state.redirect} />}
        </StyledForm>
    );
  }
}

export default CategoryForm;