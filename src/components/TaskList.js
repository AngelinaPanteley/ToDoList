import React from 'react';
import Task from './Task.js';
import { Route } from 'react-router-dom';
import styled from "styled-components";

const StyledList = styled.ul`
    max-height: calc(100vh - 250px);
    max-width: 100%;
    overflow: auto;
`;

class TaskList extends React.Component {

  render() {
    let location = this.props.routeProps.match.url;
    let index = location.lastIndexOf("category/");
    let parentCategory = location.substring(index+9);
    let newIndex = parentCategory.indexOf("/");
    if(newIndex >=0) 
        parentCategory = parentCategory.substring(0, newIndex);
    let list=this.props.taskList.filter(function(elem){return elem.parentCategory==parentCategory});
    let {showDone, search} = this.props;
    if(search) {
        list=list.filter(function(elem){return elem.name.indexOf(search)>=0});
    }
    if(showDone) {
        list=list.filter(function(elem){return elem.completed});
    }
    list=list.map(function(elem){
      return <li key={elem.id} id={elem.id} className="task">
          <Route render={(props)=>{ return <Task task={elem} location={props.location.pathname} history={props.history}/>}} />
      </li>;
    });
    return (
        <StyledList>
          {list}
        </StyledList>
    );
  }
}

export default TaskList;