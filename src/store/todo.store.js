import { Todo } from "../todos/models/todo.model";

const Filters = {
  All: "all",
  Completed: "Cmopleted",
  Pending: "Pending",
};

const state = {
  todos: [
    new Todo("Piedra del alma"),
    new Todo("Piedra del infinito"),
    new Todo("Piedra del tiempo"),
  ],
  filter: Filters.All,
};

const initStore = () => {
  console.log(state);
  console.log("InitStore 😺");
};

const loadStore = () => {
  throw new Error("Not implemented");
};

/**
 *
 * @param {String} description
 */
const addTodo = (description) => {
  throw new Error("not implemented");
};

/**
 *
 * @param {String} todoId
 */
const toggleTodo = (todoId) => {
  throw new Error("not implemented");
};

/**
 *
 * @param {String} todoId
 */
const deleteTodo = (todoId) => {
  throw new Error("not implemented");
};

const deleteCompleted = () => {
  throw new Error("not implemented");
};

const setFilter = (newFilter = Filters.All) => {
  throw new Error("Not implemented");
};

const getCurrentFilter = () => {
  throw new Error("Not implemented");
};

export default {
  initStore,
  loadStore,
  toggleTodo,
  deleteTodo,
  deleteCompleted,
  setFilter,
  getCurrentFilter,
};
