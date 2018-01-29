import React from 'react';
import { connect } from 'react-redux';

import TaskList from '../components/TaskList.js';
import { Route } from 'react-router-dom';

const mapStateToProps = state => ({
  taskList: state.tasks.taskList,
  showDone: state.filters.showDone,
  search: state.filters.search
});

const VisibleTaskList = connect(mapStateToProps)(TaskList);
export default VisibleTaskList;