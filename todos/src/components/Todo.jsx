import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import { useDispatch } from 'react-redux';
import routes from '../routes.js';
import { actions as todosActions } from '../slices/todosSlice';
import { actions as todoModalActions } from '../slices/todoModalSlice.js';

/**
 * React component that renders task passed to it 
 * @param {object} todo Todo object
 */
const Todo = ({ todo }) => {
  const dispatch = useDispatch();
  const { name, id, expired, active } = todo;
  const itemVariant = expired ? 'danger' : null;
  const buttonVariant = active ? 'danger' : 'success'; 
  const buttonText = active ? 'Завершить' : 'Активировать';

  const switchActiveState = (id, currentState) => {
    dispatch(todosActions.switchActiveState({ id, currentState }));    
    axios.patch(routes.todosPath(), {[`${id}/active`]:!currentState});
  }; 

  const showTodoModal = (id) => {
    dispatch(todoModalActions.setModal(id));
  }

  return (
    <ListGroup.Item variant={itemVariant} as="li" className="d-flex justify-content-between align-items-start">
      <div className="ms-2 me-auto">
        <div className="fw-bold">{name}</div>
      </div>
      <ButtonGroup className="me-2">
        <Button onClick={() => showTodoModal(id)}>Подробнее</Button>
        <Button onClick={() => switchActiveState(id, active)}variant={buttonVariant}>{buttonText}</Button>
      </ButtonGroup>
    </ListGroup.Item>
  );
};

export default Todo;
