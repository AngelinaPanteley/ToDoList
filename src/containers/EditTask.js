import React from 'react';
import { connect } from 'react-redux';
import { editTask, checkTask, uncheckTask } from '../actions';
import ReactDOM from 'react-dom';
import styled from "styled-components";

const StyledFormInputs = styled.div`
    float: right;
    width: 50%;
`;

const StyledCategoryList = styled.ul`
    float: left;
    width: 50%;
    max-height: calc(90vh - 120px);
    max-width: 50%;
    overflow: auto;
`;

const StyledParentCategory = styled.li`
    padding-left: 10px;
`;

const StyledCategory = styled.p`
    height: 42px;
    border: 2px solid #fff;
    border-color: #3f9db8;
    padding: 5px 0 5px 5px;
    font-family: "HelveticaNeue-Light","Helvetica Neue Light","Helvetica Neue",Helvetica,Arial,"Lucida Grande",sans-serif;
    font-weight: 400;
    font-size: 14px;
    border-radius: 5px;
    width: 200px;
    margin: 5px 0;
    color: #275769;
    line-height: 29px;
    padding-right: 10px;
`;

const StyledButton = styled.button`
    float: right;
`;

const mapStateToProps = state => ({
    categoryList: state.categories.categoryList,
    taskList: state.tasks.taskList
});

const mapDispatchToProps = dispatch => ({
    onSave: (newTask, oldTask, taskList) => {
      if(newTask.completed!=oldTask.completed && newTask.completed)
        dispatch(checkTask(newTask.id, newTask.parentCategory, taskList));
      else if(newTask.completed!=oldTask.completed && !newTask.completed)
        dispatch(uncheckTask(newTask.id, newTask.parentCategory, taskList));
      dispatch(editTask(newTask));
    }
});

class EditTask extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
        name: props.task.name,
        description: props.task.description,
        id: props.task.id,
        parentCategory: props.task.parentCategory,
        completed: props.task.completed
    }
    this.oldTask = {
        name: props.task.name,
        description: props.task.description,
        id: props.task.id,
        parentCategory: props.task.parentCategory,
        completed: props.task.completed
    }
    this.name = props.task.name;
    this.description= props.task.description;
    this.id= props.task.id;
    this.parentCategory= props.task.parentCategory;
    this.completed= props.task.completed;

    this.redirect=`/category/${props.current.parentCategory}`;
    this.onSave=this.onSave.bind(this);
    this.onClose=this.onClose.bind(this);
    this.onNameChange=this.onNameChange.bind(this);
    this.onCheckChange=this.onCheckChange.bind(this);
    this.onDescriptionChange=this.onDescriptionChange.bind(this);
    this.onParentChange=this.onParentChange.bind(this);
  }

  onNameChange(e) {
    this.setState({name: e.target.value});
    this.name = e.target.value;
    this._render();
  }

  onCheckChange(e) {
    this.setState({completed: !this.completed});
    this.completed = !this.completed;
    this._render();
  }

  onDescriptionChange(e) {
    this.setState({description: e.target.value});
    this.description = e.target.value;
    this._render();
  }

  componentDidMount() {
    this.modalTarget = document.createElement('div');
    this.modalTarget.className = 'fade';
    document.body.appendChild(this.modalTarget);
    this._render();
  }

  createCategoryList(parentId) {
    let categories = parentId? this.props.categoryList.filter(
        (elem) => {return elem.parentId==parentId}
    ) : this.props.categoryList.filter(
    (elem) => {return !elem.parentId}
    );
    if(categories.length==0) {
        return null;
    }
    let list=categories.map((elem)=>{
        return this.createCategory(elem.name, elem.id);
    });
    
    return list;
  }

  onParentChange(newParentCategory) {
    this.parentCategory = newParentCategory;
    this.setState({
        parentCategory: newParentCategory
    });
    this._render();
      
  }

  createCategory(name, id) {
    let category = (<StyledParentCategory>
    <StyledCategory>{name}
        <StyledButton disabled={this.parentCategory==id} onClick={()=>{this.onParentChange(id)}}>
            <i className="icon-reply"></i>
        </StyledButton>
    </StyledCategory>
    <ul>{this.createCategoryList(id)}</ul>
    </StyledParentCategory>)
    return category;
  }

  _render() {
    let categories = this.createCategoryList(null);
    let element = (
        <div className="modal">
            <form onSubmit={this.onSave} className="edit-task-form">
                <div className="clearfix">
                  <StyledFormInputs>
                    <input type="text" value={this.name} onChange={this.onNameChange}/>
                    <div>
                        <input type="checkbox" checked={this.completed} onChange={this.onCheckChange} id="checktask"/>
                        <label htmlFor="checktask">{this.completed? "Done" : "Not Done"}</label>
                    </div>
                    <textarea placeholder="Enter description..." onChange={this.onDescriptionChange} value={this.description}>{this.description}</textarea>
                  </StyledFormInputs>
                  <StyledCategoryList>
                      {categories}
                  </StyledCategoryList>
                </div>
                <div className="button-line">
                    <input type="submit" value="Save"/>
                    <button onClick={this.onClose}>Cancel</button>
                </div>
            </form>
        </div>
    );
    ReactDOM.render(element, this.modalTarget);
  }

  onSave () {
    this.redirect = `/category/${this.parentCategory}`;
    this.props.onSave(this.state, this.oldTask, this.props.taskList);
    this.onClose();
  }

  onClose(){
    ReactDOM.unmountComponentAtNode(this.modalTarget);
    document.body.removeChild(this.modalTarget);
    this.props.history.push(this.redirect);
  }
  
  render() {
    return null;
  }
}

export default EditTask = connect(mapStateToProps, mapDispatchToProps)(EditTask);