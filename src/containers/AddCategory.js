import React from 'react';
import { connect } from 'react-redux';
import { addCategory } from '../actions';
import CategoryForm from '../components/CategoryForm'

const mapStateToProps = state => ({
    buttonValue: "Add Category"
});

const mapDispatchToProps = dispatch => ({
    onSubmit: (value) =>
      dispatch(addCategory(value))
});

const AddCategory = connect(mapStateToProps, mapDispatchToProps)(CategoryForm);

export default AddCategory; 