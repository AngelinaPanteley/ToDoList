import React from 'react';
import { connect } from 'react-redux';
import { editCategory } from '../actions';
import CategoryForm from '../components/CategoryForm'

const mapStateToProps = state => ({
        buttonValue: "Edit Category"
});

const mapDispatchToProps = dispatch => ({
    onSubmit: (value, current) =>
      dispatch(editCategory(value, current))
});

const EditCategory = connect(mapStateToProps, mapDispatchToProps)(CategoryForm);

export default EditCategory; 