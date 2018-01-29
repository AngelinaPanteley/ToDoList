import React from 'react';
import { connect } from 'react-redux';
import { showDone } from '../actions';
import styled from "styled-components";

const mapStateToProps = state => ({
    value: state.filters.showDone,
});

const mapDispatchToProps = dispatch => ({
    showDone: (value) =>
      dispatch(showDone(value))
});

class Filter extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
        };
          
        this.onValueChange = this.onValueChange.bind(this);
    }

    componentWillReceiveProps (props) {
        this.setState({
            value: props.value,
        });
    }

    onValueChange(e) {
        let oldValue= this.state.value;
        this.setState({value: !oldValue});
        this.props.showDone(!oldValue);
    }

    render() {
        return (
            <div>
              <input type="checkbox" ref={function(node) {
                this.checkbox = node
              }.bind(this)} id="show-done" checked={this.state.value} onChange={this.onValueChange}/>
              <label htmlFor="show-done">Show Done</label>
            </div>
        );
    }
}

export default Filter = connect(mapStateToProps, mapDispatchToProps)(Filter);