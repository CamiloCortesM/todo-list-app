import { App } from "./src/todos/app";
import "./style.css";
import todoStre from "./src/store/todo.store";

todoStre.initStore();

App("#app");
