import React from 'react';
import { connect } from 'react-redux';
import { addSubCategory } from '../actions';
import CategoryForm from '../components/CategoryForm'

const mapStateToProps = state => ({
    buttonValue: "Add Subcategory"
});

const mapDispatchToProps = dispatch => ({
    onSubmit: (value, current, id) =>
      dispatch(addSubCategory(value, current, id))
});

const AddSubCategory = connect(mapStateToProps, mapDispatchToProps)(CategoryForm);

export default AddSubCategory; 