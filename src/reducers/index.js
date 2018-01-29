import { combineReducers } from 'redux';
import categories from './categories';
import tasks from './tasks';
import filters from './filters';

const todoApp =  combineReducers({
    categories,
    tasks,
    filters
});

export default todoApp;