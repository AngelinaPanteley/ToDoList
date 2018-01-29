import React from 'react';
import AddCategory from '../containers/AddCategory';
import VisibleCategoryList from '../containers/VisibleCategoryList';
import AddTask from '../containers/AddTask';
import ProgressBar from '../containers/ProgressBar';
import SearchBar from '../containers/SearchBar';
import Filter from '../containers/Filter';
import ClearFiltersLink from '../containers/ClearFiltersLink';
import VisibleTaskList from '../containers/VisibleTaskList';
import { Route } from 'react-router-dom';
import styled from "styled-components";

const Title = styled.h1`
    font-family: 'Bree Serif', serif;
    font-weight: 300;
    line-height:34px;
    color: #414848;
    text-shadow: 1px 1px 0 rgba(256,256,256,1.0);
    margin-bottom: 20px;
    margin-top: 20px;
    font-size: 40px;
    text-align: center;
    color: palevioletred;
`;

const Column = styled.div`
    float: left;
    width: 50%;
    padding: 30px;
`;


class App extends React.Component {
    render () {
        return (
            <div className="App" id="app">
                <Title>To-Do List</Title>
                <ProgressBar />
                <Column>
                    <AddCategory />
                    <Route render={(props)=><VisibleCategoryList parentId={null} routeProps={props} />} /> 
                </Column>
                <Column>
                    <div className="filter-row">
                      <Route path="/category/:id" component={Filter} /> 
                      <Route path="/category/:id" component={SearchBar} />
                      <Route path="/category/:id" component={ClearFiltersLink} />
                    </div>
                    <Route path="/category/:id" render={(props)=><AddTask routeProps={props} />} /> 
                    <Route path="/category/:id" render={(props)=><VisibleTaskList routeProps={props} />} /> 
                </Column>          
            </div>
        )
    }
}

export default App;