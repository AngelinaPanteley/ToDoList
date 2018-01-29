import React from 'react';
import { connect } from 'react-redux';
import { addTask } from '../actions';
import TaskForm from '../components/TaskForm'

const mapDispatchToProps = dispatch => ({
    onSubmit: (value, parentCategory) =>
      dispatch(addTask(value, parentCategory))
});

const AddTask = connect(null, mapDispatchToProps)(TaskForm);

export default AddTask; 