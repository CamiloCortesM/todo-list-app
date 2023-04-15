import todoStore from "../store/todo.store";
import html from "./app.html?raw";
import { renderTodos } from "./uses-cases";

const ElementIDs = {
  TodoList: ".todo-list",
  NewTodoInput: "#new-todo-input",
  ClearCompleted: ".clear-completed",
};

/**
 *
 * @param {String} elementId
 */

export const App = (elementId) => {
  const displayTodos = () => {
    const todos = todoStore.getTodos();
    renderTodos(ElementIDs.TodoList, todos);
  };

  (() => {
    const app = document.createElement("div");
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    displayTodos();
  })();

  //References HTML
  const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
  const todoListUL = document.querySelector(ElementIDs.TodoList);
  const clearComplete = document.querySelector(ElementIDs.ClearCompleted);

  //listeners
  newDescriptionInput.addEventListener("keyup", (event) => {
    if (event.keyCode !== 13) return;
    if (event.target.value.trim().length === 0) return;

    todoStore.addTodo(event.target.value);
    displayTodos();
    event.target.value = "";
  });

  todoListUL.addEventListener("click", (event) => {
    const element = event.target.closest("[data-id]");
    event.target.className === "destroy"
      ? todoStore.deleteTodo(element.getAttribute("data-id"))
      : todoStore.toggleTodo(element.getAttribute("data-id"));
    displayTodos();
  });

  clearComplete.addEventListener("click", () => {
    todoStore.deleteCompleted();
    displayTodos();
  });
};
