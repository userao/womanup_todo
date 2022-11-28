import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import {
  actions as todosActions,
  selectors as todosSelectors,
} from '../slices/todosSlice.js';
import routes from '../routes.js';
import Todo from './Todo.jsx';
import isExpired from '../isExpired.js';

const getNormalizedTodos = (data) => {
  if (!data) return [];
  return Object.entries(data)
    .map(([id, value]) => {
      const expired = isExpired(data.expDate);
      // const active = value.active === 'true' ? true : false;
      return ({ ...value, expired, id });
    })
  };

const Todos = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchTodos = async () => {
      const { data }  = await axios.get(routes.todosPath());
      const todos = getNormalizedTodos(data);
      dispatch(todosActions.addTodos(todos));
    };

    fetchTodos();
  }, []);

  const todos = useSelector(todosSelectors.selectAll);
  const activeTodos = todos.filter((todo) => todo.active);
  const finishedTodos = todos.filter((todo) => !todo.active);

  return (
    <div className="row">
      <div className="col">
        <h4 className="text-center">Активные задачи</h4>
        <div>
          <ListGroup as="ol" numbered>
            {activeTodos.map((todo) => <Todo key={todo.id} todo={todo} />)}
          </ListGroup>
        </div>
      </div>
      <div className="col">
        <h4 className="text-center">Завершенные задачи</h4>
        <div>
          <ListGroup as="ol" numbered>
            {finishedTodos.map((todo) => <Todo key={todo.id} todo={todo} />)}
          </ListGroup>
        </div>
      </div>
    </div>  
  )
};

export default Todos;
