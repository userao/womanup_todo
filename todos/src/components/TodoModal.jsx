import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'; 
import { useFormik } from 'formik';
import { actions as todosActions } from '../slices/todosSlice.js';
import { actions as todosModalActions } from '../slices/todoModalSlice.js';
import routes from '../routes.js';
import isExpired from '../isExpired.js';
import { selectors as todosSelectors } from '../slices/todosSlice.js';

const TodoModal = ({ todoId }) => {
  const dispatch = useDispatch();
  const todos = useSelector(todosSelectors.selectAll);
  const [isReadOnly, setIsReadOnly] = useState(true);
 
  const todo = todos.find((todo) => todo.id === todoId);
  const f = useFormik({
    initialValues: {
      name: todo.name,
      description: todo.description,
      expDate: todo.expDate,
      file: todo.file,
    },
    onSubmit: (values, actions) => console.log(values),
  });
  
  const handleClose = () => {
    dispatch(todosModalActions.setModal(null));
  };

  const handleRemove = (id) => {
    dispatch(todosActions.removeTodo(id));
    dispatch(todosModalActions.setModal(null));
    axios.delete(routes.todoPath(id));
  };

  const saveChanges = () => {
    const updates = {
      name: f.values.name,
      description: f.values.description,
      expDate: f.values.expDate,
      file: f.values.file ?? null,
      expired: isExpired(f.values.expDate),
    };
    console.log(updates.file);
    const editedTodo = { ...todo, ...updates };
    dispatch(todosActions.updateTodo(editedTodo));
    axios.patch(routes.todoPath(todo.id), updates);
    setIsReadOnly(true);
  };

  const cancelChanges = () => {
    f.values.name = todo.name;
    f.values.description = todo.description;
    f.values.expDate = todo.expDate;
    setIsReadOnly(true);
  };

  const makeActive = () => setIsReadOnly(false);

  return (
    <Modal show={true} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Просмотр задачи</Modal.Title>
      </Modal.Header>
      <Modal.Body>
         <Form onSubmit={f.handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label className="fw-bold">Название задачи</Form.Label>
            <Form.Control
              required
              plaintext={isReadOnly}
              readOnly={isReadOnly}
              onChange={f.handleChange}
              name="name"
              type="text"
              value={f.values.name}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label className="fw-bold">Описание задачи</Form.Label>
            <Form.Control
              required
              plaintext={isReadOnly}
              readOnly={isReadOnly}
              onChange={f.handleChange}
              name="description"
              type="text"
              as="textarea"
              rows={3}
              value={f.values.description}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="file">
            <Form.Label className="fw-bold">Прикрепленные файлы</Form.Label>
            <Form.Control
              onChange={f.handleChange}
              disabled={isReadOnly}
              name="file"
              type="file"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="expDate">
            <Form.Label className="fw-bold">Дата завершения</Form.Label>
            <Form.Control
              plaintext={isReadOnly}
              readOnly={isReadOnly}
              required
              name="expDate"
              onChange={f.handleChange}
              type="date"
              value={f.values.expDate}
            />
          </Form.Group>
          <div className="d-flex flex-row-reverse">
            <Button
              disabled={f.isSubmitting}
              className="me-2"
              variant={isReadOnly ? "primary" : "success"}
              type="button"
              onClick={isReadOnly ? makeActive : saveChanges}
            >
              {isReadOnly ? 'Изменить' : 'Сохранить'}
            </Button>
            <Button
              disabled={f.isSubmitting}
              className="me-2"
              variant="danger"
              onClick={isReadOnly ? () => handleRemove(todo.id) : cancelChanges}
            >
              {isReadOnly ? 'Удалить' : 'Отменить'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
};

export default TodoModal;
