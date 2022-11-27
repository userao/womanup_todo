import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const todosAdapter = createEntityAdapter();
const initialState = todosAdapter.getInitialState();

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodos: todosAdapter.addMany,
    addTodo: todosAdapter.addOne,
    removeTodo: todosAdapter.removeOne,
    updateTodo: (state, { payload }) => {
      const updates = Object.entries(payload)
        .reduce((acc, [key, val]) => {
          if (key === 'id') return acc;
          const newAcc = { ...acc };
          newAcc.changes = { ...newAcc.changes, [key]: val };
          return newAcc;
        }, { id: payload.id, changes: {}});
      todosAdapter.updateOne(state, updates);
    },
    switchActiveState: (state, { payload }) => {
      const active = !state.entities[payload.id].active;
      todosAdapter.updateOne(state, { id: payload.id, changes: { active } });
    },
  },
})

export const { actions } = todosSlice;
export const selectors = todosAdapter.getSelectors((state) => state.todos);
export default todosSlice.reducer;