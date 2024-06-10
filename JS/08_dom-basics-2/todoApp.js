(function () {

  function createAppTitle(title) {
    let appTitle = document.createElement("h2");
    appTitle.innerHTML = title;
    return appTitle;
  }

  function createTodoForm() {
    let form = document.createElement("form");
    let input = document.createElement("input");
    let buttonWrapper = document.createElement("div");
    let button = document.createElement("button");

    form.classList.add("input-group", "mb-3");
    input.classList.add("form-control");
    input.placeholder = "Введите названия нового дела";
    buttonWrapper.classList.add("input-group-append");
    button.classList.add("btn", "btn-primary");
    button.disabled = true;
    button.textContent = "Добавить дело";

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
      form,
      input,
      button,
    };
  }

  function createTodoList() {
    let list = document.createElement("ul");
    list.classList.add("list-group");
    return list;
  }

  function createTodoItem(name, done = false) {
    let item = document.createElement("li");

    let buttonGroup = document.createElement("div");
    let doneButton = document.createElement("button");
    let deleteButton = document.createElement("button");

    item.classList.add("list-group-item", "d-flex", "justify-content-between", "align-item-center");
    item.textContent = name;
    if (done !== false) {
      item.classList.toggle("list-group-item-success");
    }

    buttonGroup.classList.add("btn-group", "btn-group-sm");
    doneButton.classList.add("btn", "btn-success");
    doneButton.textContent = "Готово";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.textContent = "Удалить";

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    return {
      item,
      doneButton,
      deleteButton,
    };
  }

  function createTodoApp(container, title = "Список дел", listName) {
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoForm();
    let todoList = createTodoList();

    let workArr = loadLocal(listName);

    for (let value of workArr) {
      let listWork = createTodoItem(value.name, value.done);
      addEvent(listWork, workArr, listName);
      listWork.item.id = value.id;
      todoList.append(listWork.item);
    }

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    todoItemForm.form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!todoItemForm.input.value) {
        return
      }

      let todoItem = createTodoItem(todoItemForm.input.value);
      todoItem.item.id = getId(workArr);

      workArr.push({
        id: todoItem.item.id,
        name: todoItemForm.input.value,
        done: false
      })

      addEvent(todoItem, workArr, listName);

      todoList.append(todoItem.item);
      saveLocal(listName, workArr);
      todoItemForm.input.value = "";
      todoItemForm.button.disabled = true;
    });
  }

  function addEvent(item, arr, key) {
    item.doneButton.addEventListener("click", () => {
      item.item.classList.toggle("list-group-item-success");
      for (let value in arr) {
        if (arr[value].id === item.item.id) {
          arr[value].done = !arr[value].done;
          saveLocal(key, arr);
        }
      }
    });
    item.deleteButton.addEventListener("click", () => {
      if (confirm("Вы уверены?")) {
        for (let value in arr) {
          if (arr[value].id === item.item.id) {
            arr.splice(value, 1);
            saveLocal(key, arr);
          }
        }
        item.item.remove();
      }
    });
  }

  function getId(arr = []) {
    let elements = [];

    if (arr.length === 0) {
      return 1;
    }

    for (let value of arr) {
      elements.push(value.id);
    }
    return (Math.max.apply(null, elements) + 1);
  }

  function loadLocal(key) {
    if (JSON.parse(localStorage.getItem(key)) !== null) {
      return JSON.parse(localStorage.getItem(key));
    }
    return [];
  }

  function saveLocal(key, data) {
    if (data.length === 0) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    let input = document.getElementsByClassName("form-control")[0];
    input.addEventListener("input", () => {
      let button = document.getElementsByClassName("btn-primary")[0];
      button.disabled = false;
    });
  })

  window.createTodoApp = createTodoApp;
})();
