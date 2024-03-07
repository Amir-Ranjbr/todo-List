// document
const todos = JSON.parse(localStorage.getItem("myTodos")) || [];
const submitBtn = document.getElementById("submitBtn");
const todoContainer = document.getElementById("todoContainer");

// add Todo Func
function addTodo(e) {
  const inputTodo = document.getElementById("inputTodo");
  const title = inputTodo.value.trim();
  if (title) {
    const id = "" + new Date().getTime();
    todos.push({ name: title, id });
    inputTodo.value = "";
    localStorage.setItem("myTodos", JSON.stringify(todos));
    showTodo();
  }
}

// remove Todo Func
function removeTodo(event) {
  const deleteBtn = event.target;
  const deleteTodo = deleteBtn.id;
  const deleteIndex = todos.findIndex((todo) => todo.id == deleteTodo);

  if (deleteIndex !== -1) {
    todos.splice(deleteIndex, 1);
    localStorage.setItem("myTodos", JSON.stringify(todos));
    showTodo();
  }
}

// show Todo Func
function showTodo() {
  todoContainer.textContent = "";

  todos.forEach(function (todo, i) {
    const titleContainer = document.createElement("div");
    titleContainer.id = "titleContainer";
    titleContainer.textContent = `${i + 1} 📃 ${todo.name}`;
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Done";
    deleteBtn.id = todo.id;
    deleteBtn.onclick = removeTodo;
    titleContainer.appendChild(deleteBtn);
    todoContainer.appendChild(titleContainer);
  });
  makeListsSortable();
}
// scroll Func
function makeListsSortable() {
  Sortable.create(todoContainer, {
    animation: 350,
    onEnd: function (event) {
      const newIndex = event.newIndex;
      const movedItem = todos.splice(event.oldIndex, 1)[0];
      todos.splice(newIndex, 0, movedItem);
      localStorage.setItem("myTodos", JSON.stringify(todos));
    },
  });
}
showTodo();
// listener Btn
submitBtn.addEventListener("click", addTodo);
