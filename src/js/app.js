const tArea = document.querySelector("#textarea");
const btnAdd = document.getElementById("btn__task");
const taskList = document.querySelector(".task-list");
const btnDeleteAll = document.querySelector(".btn-delete-all");
const msg = document.querySelector(".no-tasks-msg");

btnAdd.addEventListener("click", addTask);
taskList.addEventListener("click", deleteTask);
document.addEventListener("DOMContentLoaded", loadTaskList);
btnDeleteAll.addEventListener("click", deleteAll);

function addTask(e) {
  if (tArea.value !== "") {
    const newTask = document.createElement("li");
    newTask.classList.add("task");
    newTask.innerHTML = `${tArea.value}<a class="btnD"></a>`;
    taskList.appendChild(newTask);
    addLocalStorage(tArea.value);
    tArea.value = "";
  } else alert("No ingresaste ninguna tarea.");
  e.preventDefault();
  btnDeleteAll.style.display = "block";
  msg.style.display = "none";
}

function deleteTask(e) {
  if (e.target.classList.contains("btnD")) {
    e.target.parentNode.remove();
    deleteLocalStorage(e.target.parentNode);
  }
  if (Array.from(taskList.children).length === 0) {
    btnDeleteAll.style.display = "none";
    msg.style.display = "block";
  }

  e.preventDefault();
}

function addLocalStorage(task) {
  let tasks;
  tasks = getTasks();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  return tasks;
}

function loadTaskList() {
  let tasks = getTasks();
  tasks.forEach((task) => {
    const newTask = document.createElement("li");
    newTask.classList.add("task");
    newTask.innerHTML = `${task}<a class="btnD"></a>`;
    taskList.appendChild(newTask);
  });
  if (tasks.length === 0) {
    btnDeleteAll.style.display = "none";
    msg.style.display = "block";
  }
}

function deleteLocalStorage(task) {
  let tasks = getTasks();
  const taskToDelete = task.textContent;
  tasks.forEach((task, index) => {
    if (taskToDelete === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteAll() {
  Array.from(taskList.children).forEach((task) => {
    task.remove();
  });
  localStorage.clear();
  btnDeleteAll.style.display = "none";
  msg.style.display = "block";
}
