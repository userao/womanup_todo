const apiPath = 'https://womanup-4b74a-default-rtdb.europe-west1.firebasedatabase.app';

/**
 * Object containing routes for backend requesting 
 */
const routes = {
  todosPath: () => [apiPath, 'todos.json'].join('/'),
  todoPath: (id) => [apiPath, 'todos', `${id}.json`].join('/'),
};

export default routes;
