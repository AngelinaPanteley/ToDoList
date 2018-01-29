const initialState = {
    categories: {  categoryList: [], progress: 0 },
    tasks: {taskList: []},
    filters: {showDone: false, search: ""}
}

const categories = (state = initialState, action) => {
    let newState, list, index, taskList, newCategory, progress;
    switch (action.type) {
      case 'ADD_CATEGORY':
        progress = ++state.progress;
        newState = {
            ...state,
            categoryList: [{
                id: action.payloads.id,
                name: action.payloads.name,
                completed: true,
                parentId: null
              }].concat(state.categoryList),
            progress: progress,
          };
        return newState;
      case 'EDIT_CATEGORY':
        let editCategory = {
            id: action.payloads.currentCategory.id,
            name: action.payloads.newName,
            completed: action.payloads.currentCategory.completed,
            parentId: action.payloads.currentCategory.parentId
        }
        list = state.categoryList;
        index = list.findIndex(function(elem){return elem.id==editCategory.id});
        newState = {
            ...state,
            categoryList: list.slice(0,index).concat([editCategory], list.slice(index+1))
        };
        return newState;
      case 'ADD_SUBCATEGORY':
        newCategory = {
            id: action.payloads.id,
            name: action.payloads.name,
            completed: true,
            parentId: action.payloads.parentId
        }
        progress = ++state.progress;
        newState = {
            ...state,
            categoryList: [newCategory].concat(state.categoryList),
            progress: progress,
        };
        return newState;
      case 'DELETE_CATEGORY':
        progress = state.progress;
        list = state.categoryList;
        index = list.findIndex(function(elem){return elem.id==action.payloads.current.id});
        if(list[index].completed) progress--;
        let newList=list.slice(0,index).concat(list.slice(index+1));
        index = newList.findIndex(function(elem){return elem.parentId && elem.parentId.indexOf(action.payloads.current.id)===0});
        while(index>=0) {
            if(list[index].completed) progress--;
            newList=newList.slice(0,index).concat(newList.slice(index+1));
            index = newList.findIndex(function(elem){return elem.parentId && elem.parentId.indexOf(action.payloads.current.id)===0});
        }
        newState = {
            ...state,
            categoryList: newList,
            progress: progress
        };
        return newState;
      case 'ADD_TASK':
        progress = state.progress;
        list = state.categoryList;
        index = list.findIndex(function(elem){return elem.id==action.payloads.parentCategory});
        let category = {
            id: list[index].id,
            name: list[index].name,
            completed: false,
            parentId: list[index].parentId
        }
        if(list[index].completed) progress--;
        newState = {
            ...state,
            categoryList: list.slice(0,index).concat([category], list.slice(index+1)),
            progress: progress
        };
        return newState;
      case 'CHECK_TASK':
        progress = state.progress;
        list = state.categoryList;
        index = list.findIndex((elem)=>{return elem.id == action.payloads.parentCategory});
        taskList = action.payloads.taskList.filter((elem)=> {return elem.parentCategory==action.payloads.parentCategory && !elem.completed});
        if(taskList.length==1) {
            progress++;
            newCategory = {
                id: list[index].id,
                name: list[index].name,
                completed: true,
                parentId: list[index].parentId
            }
            newState = {
                ...state,
                categoryList: list.slice(0,index).concat(newCategory,list.slice(index+1)),
                progress: progress
            };
            return newState;
        }
        else 
            return state;   

      case 'UNCHECK_TASK':
        progress=state.progress;
        list = state.categoryList;
        index = list.findIndex((elem)=>{return elem.id == action.payloads.parentCategory});
        if(list[index].completed) progress--;
        newCategory = {
            id: list[index].id,
            name: list[index].name,
            completed: false,
            parentId: list[index].parentId
        }
        newState = {
            ...state,
            categoryList: list.slice(0,index).concat(newCategory,list.slice(index+1)),
            progress: progress
        };
        return newState; 
            
      default:
        return state
    }
}
  
export default categories;


