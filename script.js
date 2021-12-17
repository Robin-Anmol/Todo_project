/*===================={variables}=====================*/

const input_task = document.querySelector("#new-task-input");
const submit_btn = document.querySelector("#new-task-submit");
const tasks = document.querySelector("#tasks");
const sort_todo = document.querySelector("#sort_todo");
const array = [];
/*===================={create element function }=====================*/

function creatingTodoTask(task_value) {
  const task_element = document.createElement("div");
  task_element.classList.add("task");

  const task_content_element = document.createElement("div");
  task_content_element.classList.add("content");

  const task_input_checkbox = document.createElement("input");
  task_input_checkbox.classList.add("checkbox");
  task_input_checkbox.type = "checkbox";

  const task_input_text = document.createElement("input");
  task_input_text.classList.add("text");
  task_input_text.type = "text";
  task_input_text.value = task_value;
  task_input_text.setAttribute("readonly", "readonly");

  const task_action_element = document.createElement("div");
  task_action_element.classList.add("actions");

  const task_edit_btn = document.createElement("button");
  task_edit_btn.classList.add("edit");
  task_edit_btn.innerText = "Edit";

  const task_delete_btn = document.createElement("button");
  task_delete_btn.classList.add("delete");
  task_delete_btn.innerText = "Delete";

  task_content_element.appendChild(task_input_checkbox);
  task_content_element.appendChild(task_input_text);

  task_action_element.appendChild(task_edit_btn);
  task_action_element.appendChild(task_delete_btn);

  task_element.appendChild(task_content_element);
  task_element.appendChild(task_action_element);

  tasks.appendChild(task_element);

  const delete_btn = task_element.querySelector(".delete");
  const edit_btn = task_element.querySelector(".edit");

  const check_btn = task_element.querySelector(".checkbox");

  /*===================={insert array element to localStorage}}=====================*/

  array.push(task_value);
  addToLocalStorage(array);

  /*===================={ addEventlistener for checkbox for completed or uncomplete task }=====================*/
  check_btn.addEventListener("click", function () {
    const checkClass = task_element.classList.contains("task_opacity");
    const line_through = task_input_text.classList.contains("line_through");
    // console.log(checkClass);
    task_input_text.classList.toggle("line_through");
    task_element.classList.toggle("task_opacity");
  });

  /*===================={addEventListener for deleting task}=====================*/
  delete_btn.addEventListener("click", function () {
    tasks.removeChild(task_element);
    const index = array.indexOf(task_value);
    // console.log(index);
    array.splice(index, 1);
    addToLocalStorage(array);
  });

  /*===================={addEventListener for edit and save task }=====================*/

  edit_btn.addEventListener("click", function () {
    const check = task_input_text.hasAttribute("readonly");
    const checkComplete = task_element.classList.contains("task_opacity");
    // console.log(check);
    // console.log(checkComplete);
    if (check && !checkComplete) {
      edit_btn.innerText = "SAVE";
      task_input_text.removeAttribute("readonly");
    } else {
      edit_btn.innerText = "EDIT";
      const indexVaule = array.indexOf(task_value);
      task_value = task_input_text.value;
      array[indexVaule] = task_value;
      addToLocalStorage(array);
      task_input_text.setAttribute("readonly", "readonly");
    }
  });
  /*===================={}=====================*/
}

/*===================={adding task in todo}=====================*/
submit_btn.addEventListener("click", function (e) {
  e.preventDefault();
  const task_value = input_task.value;
  //   console.log(task_value)
  if (task_value) {
    creatingTodoTask(task_value);
  }
  input_task.value = "";
});

/*===================={sort addEventlistener }=====================*/

sort_todo.addEventListener("click", function (e) {
  const value = e.target.value;
  // console.log(value);
  const todo_array = tasks.children;
  console.log(todo_array);

  // console.log(todo_array);
  let Todo_length = todo_array.length;
  // console.log(Todo_length);
  for (let i = 0; i < Todo_length; i++) {
    const class_test = todo_array[i].classList.contains("task_opacity");
    if (value == "All") {
      todo_array[i].style.display = "flex";
    } else if (value == "completed") {
      if (class_test) {
        todo_array[i].style.display = "flex";
      } else todo_array[i].style.display = "none";
    } else {
      if (class_test) {
        todo_array[i].style.display = "none";
        // console.log(todo_array);
      } else todo_array[i].style.display = "flex";
    }
  }
});

/*===================={add to local storage }=====================*/

function addToLocalStorage(array) {
  localStorage.setItem("task", JSON.stringify(array));
}

/*===================={get from local storage}=====================*/
function getFromLocalStorage() {
  let reference = JSON.parse(localStorage.getItem("task"));
  reference.forEach((element) => {
    creatingTodoTask(element);
  });
}

getFromLocalStorage();
