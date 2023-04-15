import todoStore, { Filters } from "../store/todo.store";
import html from "./app.html?raw";
import { renderPending, renderTodos } from "./uses-cases";

const ElementIDs = {
  TodoList: ".todo-list",
  NewTodoInput: "#new-todo-input",
  ClearCompleted: ".clear-completed",
  TodoFilters: ".filtro",
  PendingCount: "#pending-count",
};

/**
 *
 * @param {String} elementId
 */

export const App = (elementId) => {
  const displayTodos = () => {
    const todos = todoStore.getTodos(todoStore.getCurrentFilter());
    renderTodos(ElementIDs.TodoList, todos);
  };

  const updatePendingCount = () => {
    renderPending(ElementIDs.PendingCount);
  };

  (() => {
    const app = document.createElement("div");
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    displayTodos();
    updatePendingCount();
  })();

  //References HTML
  const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
  const todoListUL = document.querySelector(ElementIDs.TodoList);
  const clearComplete = document.querySelector(ElementIDs.ClearCompleted);
  const filterLIs = document.querySelectorAll(ElementIDs.TodoFilters);
  //listeners
  newDescriptionInput.addEventListener("keyup", (event) => {
    if (event.keyCode !== 13) return;
    if (event.target.value.trim().length === 0) return;

    todoStore.addTodo(event.target.value);
    displayTodos();
    updatePendingCount();
    event.target.value = "";
  });

  todoListUL.addEventListener("click", (event) => {
    const element = event.target.closest("[data-id]");
    event.target.className === "destroy"
      ? todoStore.deleteTodo(element.getAttribute("data-id"))
      : todoStore.toggleTodo(element.getAttribute("data-id"));
    displayTodos();
    updatePendingCount();
  });

  clearComplete.addEventListener("click", () => {
    todoStore.deleteCompleted();
    displayTodos();
  });

  filterLIs.forEach((element) => {
    element.addEventListener("click", (element) => {
      filterLIs.forEach((el) => el.classList.remove("selected"));
      element.target.classList.add("selected");
      switch (element.target.text) {
        case "Todos":
          todoStore.setFilter(Filters.All);
          break;
        case "Completados":
          todoStore.setFilter(Filters.Completed);
          break;
        case "Pendientes":
          todoStore.setFilter(Filters.Pending);
          break;
      }

      displayTodos();
    });
  });
};
