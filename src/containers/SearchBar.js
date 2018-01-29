import React from 'react';
import { connect } from 'react-redux';
import { search } from '../actions';
import styled from "styled-components";

const mapStateToProps = state => ({
    value: state.filters.search,
});

const mapDispatchToProps = dispatch => ({
    onSearch: (value) =>
      dispatch(search(value))
});

class SearchBar extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
        };
          
        this.onValueChange = this.onValueChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    componentWillReceiveProps (props) {
        this.setState({
            value: props.value,
        });
    }

    onValueChange(e) {
        this.setState({value: e.target.value});
    }
      
    onSearch (e) {
        e.preventDefault();
        this.props.onSearch(this.input.value);
    }

    render() {
        return (
            <form onSubmit={this.onSearch}>
              <input type="text" ref={function(node) {
                this.input = node
              }.bind(this)} value={this.state.value} onChange={this.onValueChange}/>
              <input type="submit" value="Search"/>
            </form>
        );
    }
}

export default SearchBar = connect(mapStateToProps, mapDispatchToProps)(SearchBar);