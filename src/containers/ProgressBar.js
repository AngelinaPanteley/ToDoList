import React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import styled from "styled-components";

const mapStateToProps = (state) => ({
    progress: state.categories.progress,
    listLength: state.categories.categoryList.length
});

class ProgressBar extends React.Component {
    
    constructor(props) {
        super(props);
    }

    createBarElement(width, flag) {
        let style={
            width: `${width}%`,
            background: 'rgb(177, 48, 90)'
        };
        if(flag) 
          style.background = 'rgb(75, 162, 110)';
        return <div style={style} className="bar-element"></div>;
    }

    render() {
        let {progress, listLength} = this.props;
        let barArray=[];
        
        for(let i=0; i<listLength; i++) {
            if(i<progress)
                barArray.push(this.createBarElement(100/listLength, true));
            else 
                barArray.push(this.createBarElement(100/listLength, false));
        }
        let bar = <div className="progress-bar">{barArray}</div>
        return bar;
    }
}

export default ProgressBar = connect(mapStateToProps)(ProgressBar);