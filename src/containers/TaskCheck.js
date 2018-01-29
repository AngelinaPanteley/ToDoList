import React from 'react';
import { connect } from 'react-redux';
import {checkTask, uncheckTask} from "../actions";
import styled from "styled-components";

const mapStateToProps = (state) => ({
    taskList: state.tasks.taskList
});

const mapDispatchToProps = dispatch => ({
    onCheck: (taskId, parentCategory, taskList) =>
      dispatch(checkTask(taskId, parentCategory, taskList)),
    onUncheck: (taskId, parentCategory, taskList) =>
      dispatch(uncheckTask(taskId, parentCategory, taskList))
});

class TaskCheck extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
          id: props.task.id,
          completed: props.task.completed,
          parentCategory: props.task.parentCategory
        }
        this.onCheckChanged = this.onCheckChanged.bind(this);
    }

    componentWillReceiveProps (props) {
        this.setState({
            id: props.task.id,
            completed: props.task.completed,
            parentCategory: props.task.parentCategory
        });
    }
    
    onCheckChanged () {
        let completed = this.state.completed;
        this.setState({completed: !completed});
        if(!completed)
            this.props.onCheck(this.state.id, this.state.parentCategory, this.props.taskList);
        else
            this.props.onUncheck(this.state.id, this.state.parentCategory, this.props.taskList);
        this.props.onCheckChanged();
    }

    render () {
        return (
            <input type="checkbox" checked={this.state.completed} onChange={this.onCheckChanged}/>
        )
    }
}

export default TaskCheck = connect(mapStateToProps, mapDispatchToProps)(TaskCheck);
