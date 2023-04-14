import { Todo } from "../models/todo.model";

/**
 *
 * @param {Todo} todo
 */
export const createTodoHtml = (todo) => {
  const { done, description, id } = todo;
  if (!todo) throw new Error("A TODO object is required");

  const html = `
  <div class="view">
      <input class="toggle" type="checkbox" ${done ? "checked" : ""}>
      <label>${description}</label>
      <button class="destroy"></button>
  </div>
  <input class="edit" value="Create a TodoMVC template">
`;
  const liEelement = document.createElement("li");
  liEelement.innerHTML = html;
  liEelement.setAttribute("data-id", id);
  done && liEelement.classList.add("completed");

  return liEelement;
};
