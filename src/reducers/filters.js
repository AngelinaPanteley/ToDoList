const initialState = {
    categories: {  categoryList: [], progress: 0 },
    tasks: { taskList: []},
    filters: {showDone: false, search: ""}
}

const filters = (state = initialState, action) => {
    let newState, showDone, search;
    switch (action.type) {
      case 'SEARCH':
        newState = {
            ...state,
            search: action.payloads.value,
        }
        return newState;
      case 'SHOW_DONE':
        newState = {
            ...state,
            showDone: action.payloads.value,
        }
        return newState;
      case 'CLEAR_FILTERS':
        newState = {
            ...state,
            showDone: false,
            search: ""
        }
        return newState;
      default:
        return state
    }
}

  
export default filters;