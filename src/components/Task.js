import React from 'react';
import { Route, Link } from 'react-router-dom';
import TaskCheck from '../containers/TaskCheck';
import EditTask from '../containers/EditTask';
import styled from "styled-components";

const StyledTask = styled.div`
    border: 2px solid #fff;
    border-color: '#3f9db8';
    padding: 5px 0 5px 5px;
    font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
    font-weight: 400;
    font-size: 14px;
    border-radius: 5px;
    width: 318px;
    margin: 5px 0;
    line-height: 25px;
    font-size: 18px;
    font-family: 'Bree Serif',serif;
    color: #275769;
`;

const StyledLink = styled(Link)`
    float: right;
`;

const StyledDescription = styled.p`
    padding-left: 19px;
    font-size: 13px;
    color: aliceblue;
    font-weight: 300;
    word-wrap: break-word;
`;

const StyledName = styled.span`
    max-width: 235px;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    vertical-align: sub;
`;

class Task extends React.Component {
   
  constructor(props) {
    super(props);

    this.state = {
      name: props.task.name,
      id: props.task.id,
      completed: props.task.completed,
      parentCategory: props.task.parentCategory,
      description: props.task.description
    }
    this.onCheckChanged = this.onCheckChanged.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      name: props.task.name,
      id: props.task.id,
      completed: props.task.completed,
      parentCategory: props.task.parentCategory,
      description: props.task.description
    });
  }

  onCheckChanged () {
    let completed = this.state.completed;
    this.setState({completed: !completed});
  }

  render() {
    return (
        <StyledTask>
            <Route render={(props)=>{return <TaskCheck task={this.state} onCheckChanged={this.onCheckChanged} routeProps={props}/>}}></Route>
            <StyledName>{this.state.name}</StyledName>
            <StyledLink to={`/category/${this.state.parentCategory}/task-edit/${this.state.id}`} className="styled-link">
              <i className="icon-edit-alt"></i>
            </StyledLink>
            {this.state.description && <StyledDescription>{this.state.description}</StyledDescription>}
            <Route path={`/category/${this.state.parentCategory}/task-edit/${this.state.id}`} render={function renderTaskEdit(props) {
                return (<EditTask task={this.state} history={props.history} current = {this.state}/>)
            }.bind(this)}> 
            </Route>
        </StyledTask>
    );
  }
}

export default Task;
