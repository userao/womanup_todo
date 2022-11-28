import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'; 
import { useFormik } from 'formik';
import { actions as todosActions } from '../slices/todosSlice.js';
import routes from '../routes.js';
import isExpired from '../isExpired.js';
import uploadFile from '../uploadFile.js';

/**
 * React component that renders modal window for adding new task
 */
const AddTodoModal = ({isShown, handleClose}) => {
  const dispatch = useDispatch();
  const formRef = useRef();
  const [connectionFailed, setConnectionFailed] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = (values, actions) => {
    actions.setSubmitting(true);
    const expired = isExpired(values.expDate);
    const newTodo = { ...values, active: true, expired, fileName: selectedFile ? selectedFile.name : null };
    if (selectedFile) {
      uploadFile(selectedFile);
      setSelectedFile(null);
    }
    axios.post(routes.todosPath(), newTodo)
      .then(({ data }) => {
        dispatch(todosActions.addTodo({ ...newTodo, id: data.name }));
        setConnectionFailed(false);
        actions.setSubmitting(false);
        actions.resetForm();
        handleClose();
      })
      .catch((err) => {
        setConnectionFailed(true);
        actions.setSubmitting(false);
      });
  }

  const fileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const f = useFormik({
     initialValues: {
        name: '',
        description: '',
        expDate: '',
      },
      onSubmit: (values, actions) => handleSubmit(values, actions),
   });

  return (
    <Modal show={isShown} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>Добавить задачу</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form ref={formRef} onSubmit={f.handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Название задачи</Form.Label>
            <Form.Control
              required
              onChange={f.handleChange}
              name="name"
              type="text"
              value={f.values.name}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Описание задачи</Form.Label>
            <Form.Control
              required
              onChange={f.handleChange}
              name="description"
              type="text"
              as="textarea"
              rows={3}
              value={f.values.description}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="file">
            <Form.Label>Прикрепленные файлы</Form.Label>
            <Form.Control onChange={fileInput} name="file" type="file" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="expDate">
            <Form.Label>Дата завершения</Form.Label>
            <Form.Control required name="expDate" onChange={f.handleChange} type="date" />
          </Form.Group>
          {connectionFailed && <div className="alert alert-danger" role="alert">Ошибка связи</div>}
          <div className="d-flex flex-row-reverse">
            <Button disabled={f.isSubmitting} className="me-2" variant="success" type="submit">Добавить</Button>
            <Button disabled={f.isSubmitting} className="me-2" variant="danger" onClick={handleClose}>Закрыть</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddTodoModal;
