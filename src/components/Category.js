import React from 'react';
import { Route, Link } from 'react-router-dom';
import EditCategory from '../containers/EditCategory';
import AddSubCategory from '../containers/AddSubCategory';
import VisibleCategoryList from '../containers/VisibleCategoryList';
import DeleteModal from '../containers/DeleteModal';
import styled from "styled-components";

const StyledParentCategory = styled.div`
    padding: 0 15px;
    margin: 5px 0;
`;

const StyledCategory = styled.div`
    border: 2px solid #fff;
    border-color: ${props => props.className=='active' ? 'palevioletred' : '#3f9db8'};
    padding: 5px 0 5px 5px;
    font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
    font-weight: 400;
    font-size: 14px;
    border-radius: 5px;
    width: 318px;
    margin: 5px 0;
`;

const StyledLink = styled(Link)`
    float: right;
`;

class Category extends React.Component {
   
  constructor(props) {
    super(props);
    this.childAmount = 1;
  
    this.state = {
      openSubcategories: false,
      active: false
    };

    this.toggleSubCategory=this.toggleSubCategory.bind(this);
    this.openSubCategory=this.openSubCategory.bind(this);
  }

  componentWillReceiveProps (props) {
    let location = props.location;
    let index = location.lastIndexOf("category/");
    let urlId = location.substring(index+9);
    index = urlId.indexOf("/");
    if(index>=0) {
      urlId = urlId.substring(0,index);
    }
    if(urlId == this.props.elem.id)
      this.setState({active: true});
    else 
      this.setState({active: false});
  }

  toggleSubCategory(e) {
    let flag = !this.state.openSubcategories;
    this.setState({openSubcategories: flag});
    this.props.history.push(`/category/${this.props.elem.id}`);
  }

  openSubCategory(e) {
    this.setState({openSubcategories: true});
  }

  render() {
    const {name, id, completed, parentId} = this.props.elem;
    let redirect = `/category/${id}`;
    return (
      <StyledParentCategory>
        <StyledCategory className={this.state.active? "active" : "not-active"}>
            <a className='toggle-subcategory-link open styled-link' onClick={this.toggleSubCategory}>
               {this.state.openSubcategories && <i className="icon-down-open"></i>}
               {!this.state.openSubcategories && <i className="icon-up-open"></i>}
            </a>
            <Link to={`/category/${id}`} className={completed? "completed" : "not-completed"}>{id}) {name}</Link>
            <StyledLink to={`/category/${id}/category-add`} onClick={this.openSubCategory} className="styled-link">
              <i className="icon-plus-squared"></i>
            </StyledLink>
            <StyledLink to={`/category/${id}/category-delete`} className="styled-link">
               <i className="icon-trash"></i>
            </StyledLink>
            <StyledLink to={`/category/${id}/category-edit`} className="styled-link">
              <i className="icon-edit-alt"></i>
            </StyledLink>        
        </ StyledCategory>
        <Route path={`/category/${id}/category-delete`} render={function renderCategoryDelete() {
            return (<DeleteModal history={this.props.history} current = {this.props.elem} content={`Do you really want to delete category ${name}?`} onClose={this.onDeleteModalClose}/>)
        }.bind(this)}> 
        </Route>
        <Route path={`/category/${id}/category-edit`} render={function renderCategoryForm() {
            return <EditCategory current = {this.props.elem} initialValue={name} redirectTo={redirect}/>
        }.bind(this)}></Route>

        <Route path={`/category/${id}/category-add`} render={function renderCategoryForm() {
            return <AddSubCategory current = {this.props.elem} initialValue="" redirectTo={redirect} id={this.childAmount++}/>
        }.bind(this)}></Route>
        
        {this.state.openSubcategories && <Route render={(props)=> {
            return <VisibleCategoryList parentId={id} location={props.location}/>
        }}></Route>}
      </StyledParentCategory>
    );
  }
}

export default Category;
