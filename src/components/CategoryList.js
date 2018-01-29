import React from 'react';
import Category from './Category.js';
import { Route } from 'react-router-dom';
import styled from "styled-components";

const StyledList = styled.ul`
    max-height: calc(100vh - 180px);
    max-width: 100%;
    overflow: auto;
`;

class CategoryList extends React.Component {

  render() {
    let parentId=this.props.parentId;
    let list=this.props.categoryList.filter(function(elem){return elem.parentId==parentId});
    list=list.map(function(elem){
      return <li key={elem.id} id={elem.id} className="category">
          <Route render={(props)=>{ return <Category elem={elem} location={props.location.pathname} history={props.history}/>}} />
      </li>;
    });
    return (
        <StyledList>
          {list}
        </StyledList>
    );
  }
}

export default CategoryList;
