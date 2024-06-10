import { createTodoApp } from "./view.js";

export function startApi(title, owner, storage) {
  if (storage === "local") {
    import("./api-local.js").then(async (res) => {
      const todoItemList = res.getTodoList(owner);
      await createTodoApp(document.getElementById("todo-app"), {
        title,
        owner,
        todoItemList,
        onCreateFormSubmit: res.createTodoItem,
        onDoneClick: res.switchTodoItemDone,
        onDeleteClick: res.deleteTodoItem,
      });
    });
  } else {
    import("./api-server.js").then(async (res) => {
      const todoItemList = await res.getTodoList(owner);
      await createTodoApp(document.getElementById("todo-app"), {
        title,
        owner,
        todoItemList,
        onCreateFormSubmit: res.createTodoItem,
        onDoneClick: res.switchTodoItemDone,
        onDeleteClick: res.deleteTodoItem,
      });
    });
  }
}
