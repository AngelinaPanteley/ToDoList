import React from 'react';
import { connect } from 'react-redux';

import CategoryList from '../components/CategoryList.js';
import { Route } from 'react-router-dom';

const mapStateToProps = state => ({
  categoryList: state.categories.categoryList,
});

const VisibleCategoryList = connect(mapStateToProps)(CategoryList);
export default VisibleCategoryList;