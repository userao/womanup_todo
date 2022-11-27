import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Todos from './Todos.jsx';
import AddTodoModal from './AddTodoModal.jsx';
import { useSelector } from 'react-redux';
import TodoModal from './TodoModal.jsx';

const App = () => {
  const [addTodoModalShown, setAddTodoModalState] = useState(false);
  const todoModalId = useSelector((state) => state.todoModal.shownModalId);
  
  return (
    <>
      <div className="d-flex justify-content-center p-3">
        <Button
          onClick={() => setAddTodoModalState(true)}
          variant="primary"
          size="lg"
        >
          Добавить задачу
        </Button>
      </div>
      <Todos />
      <AddTodoModal isShown={addTodoModalShown} handleClose={() => setAddTodoModalState(false)}/>
      {todoModalId && <TodoModal todoId={todoModalId} />}
    </>
  );
};

export default App;
