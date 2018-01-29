let nextCategoryId = 1;
let nextTaskId = 1;

export const addCategory = (name) => ({
    type: 'ADD_CATEGORY',
    payloads: {
      id: (nextCategoryId++).toString(),
      name: name
    }
})

export const editCategory = (name, current) => ({
  type: 'EDIT_CATEGORY',
  payloads: {
    currentCategory: current,
    newName: name
  }
})

export const addSubCategory = (name, current, id) => ({
  type: 'ADD_SUBCATEGORY',
  payloads: {
    id: current.id+"."+id,
    parentId: current.id,
    name: name
  }
})

export const deleteCategory = (current) => ({
  type: 'DELETE_CATEGORY',
  payloads: {
    current: current
  }
})

export const addTask = (name, parentCategory) => ({
  type: 'ADD_TASK',
  payloads: {
    id: (nextTaskId++).toString(),
    name: name,
    parentCategory: parentCategory
  }
})

export const checkTask = (id, parentCategory, taskList) => ({
  type: 'CHECK_TASK',
  payloads: {
    id: id,
    parentCategory: parentCategory,
    taskList: taskList
  }
})

export const uncheckTask = (id, parentCategory, taskList) => ({
  type: 'UNCHECK_TASK',
  payloads: {
    id: id,
    parentCategory: parentCategory,
    taskList: taskList
  }
})

export const editTask = (current) => ({
  type: 'EDIT_TASK',
  payloads: {
    current: current,
  }
})

export const search = (value) => ({
  type: 'SEARCH',
  payloads: {
    value: value,
  }
})

export const showDone = (value) => ({
  type: 'SHOW_DONE',
  payloads: {
    value: value,
  }
})

export const clearFilters = () => ({
  type: 'CLEAR_FILTERS',
})