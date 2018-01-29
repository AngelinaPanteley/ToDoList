import React from 'react';
import { connect } from 'react-redux';
import { clearFilters } from '../actions';
import styled from "styled-components";

const mapDispatchToProps = dispatch => ({
    clearFilters: () =>
      dispatch(clearFilters())
});

class ClearFiltersLink extends React.Component {
    
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        e.preventDefault();
        this.props.clearFilters();
    }

    render() {
        return (
            <div>
              <button onClick={this.onClick}>Clear Filters</button>
            </div>
        );
    }
}

export default ClearFiltersLink = connect(null, mapDispatchToProps)(ClearFiltersLink);