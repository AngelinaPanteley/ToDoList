const initialState = {
    categories: {  categoryList: [], progress: 0 },
    tasks: { taskList: []},
    filters: {showDone: false, search: ""}
}

const tasks = (state = initialState, action) => {
    let newState, list, index, newTask;
    switch (action.type) {
      case 'ADD_TASK':
        list = [{
            id: action.payloads.id,
            name: action.payloads.name,
            completed: false,
            parentCategory: action.payloads.parentCategory,
            description: ""
          }].concat(state.taskList);
        newState = {
            ...state,
            taskList: list,
        };
        return newState;
      case 'CHECK_TASK':
        list = state.taskList;
        index = list.findIndex((elem)=>{return elem.id == action.payloads.id});
        newTask = {
            id: list[index].id,
            completed: true,
            parentCategory: list[index].parentCategory,
            description: list[index].description,
            name: list[index].name
        }
        newState = {
            ...state,
            taskList: list.slice(0,index).concat(newTask,list.slice(index+1)),
        };
        return newState;
      case 'UNCHECK_TASK':
        list = state.taskList;
        index = list.findIndex((elem)=>{return elem.id == action.payloads.id});
        newTask = {
            id: list[index].id,
            completed: false,
            parentCategory: list[index].parentCategory,
            description: list[index].description,
            name: list[index].name
        }
        newState = {
            ...state,
            taskList: list.slice(0,index).concat(newTask,list.slice(index+1)),
        };
        return newState;
      case 'EDIT_TASK':
        newTask = action.payloads.current;
        list = state.taskList;
        index = list.findIndex((elem)=>{return elem.id == newTask.id});
        newState = {
            ...state,
            taskList: list.slice(0,index).concat(newTask,list.slice(index+1)),
        };
        return newState;
      default:
        return state
    }
}

  
export default tasks;