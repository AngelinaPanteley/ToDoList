import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducers'
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'

import './styles/index.css';
import './styles/index.css';

export const initialState = {
  categories: {  categoryList: [], progress: 0 },
  tasks: {taskList: []},
  filters: {showDone: false, search: ""}
}

export const store = createStore(
  reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
