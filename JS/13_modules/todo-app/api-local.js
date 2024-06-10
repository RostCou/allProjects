function getId(arr) {
  if (arr.length === 0) {
    return 1;
  }
  return (
    arr.reduce((acc, number) => (number.id > acc.id ? number : acc), arr[0])
      .id + 1
  );
}

export function getTodoList(owner) {
  if (JSON.parse(localStorage.getItem(owner)) !== null) {
    return JSON.parse(localStorage.getItem(owner));
  }
  return [];
}

export function createTodoItem({ owner, name }) {
  const item = JSON.parse(localStorage.getItem(owner))
    ? JSON.parse(localStorage.getItem(owner))
    : [];
  item.push({
    id: getId(item),
    name,
    done: false,
  });
  localStorage.setItem(owner, JSON.stringify(item));
  return item[item.length - 1];
}

export function switchTodoItemDone({ todoItem, owner }) {
  todoItem.done = !todoItem.done;

  const todoList = getTodoList(owner);

  for (let value of todoList) {
    if (value.id === todoItem.id) {
      value.done = !value.done;
    }
  }
  localStorage.setItem(owner, JSON.stringify(todoList));
}

export function deleteTodoItem({ element, todoItem, owner }) {
  if (!confirm("Вы уверены?")) {
    return;
  }

  const todoList = getTodoList(owner);
  if (todoList.length === 1) {
    localStorage.removeItem(owner);
  } else {
    localStorage.setItem(
      owner,
      JSON.stringify(todoList.filter((item) => item.id !== todoItem.id))
    );
  }
  element.remove();
}
