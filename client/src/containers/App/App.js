import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { toggleTodo } from '../../actions';
import Todo from '../../components/Todo/Todo';

// static
import logo from '../../assets/logo.svg';
import './App.css';

const App = ({ todos, onTodoClick, children }) => (
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Welcome to React</h2>
    </div>
    <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
    <ul>
      {todos.map(todo =>
        <Todo
          key={todo.id}
          {...todo}
          onClick={() => onTodoClick(todo.id)}
        />
      )}
    </ul>
    { children }
  </div>
);

App.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onTodoClick: PropTypes.func.isRequired,
  children: PropTypes.node
};

const mapStateToProps = (state) => {
  const { todos } = state;
  return {
    todos
  };
};

const mapDispatchToProps = {
  onTodoClick: toggleTodo
};

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default ConnectedApp;
