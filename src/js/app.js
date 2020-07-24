const textarea = document.querySelector("#textarea");
const button = document.querySelector("#btn__task");
const list = document.querySelector(".task-list ");
const btnAll = document.querySelector(".btn-delete-all");

button.addEventListener("click", addTask);
list.addEventListener("click", removeTask);
document.addEventListener("DOMContentLoaded", loadTasks);
btnAll.addEventListener("click", deleteAll);
document.addEventListener("keypress", addWithEnter);

function addTask(e) {
  const task = textarea.value;
  const sizeStorage = localStorage.length;
  if (task !== "") {
    list.innerHTML += `<li class="task" id="task${
      sizeStorage + 1
    }"> ${task}<a class="delete"></a></li>`;
    localStorage.setItem(`task${sizeStorage + 1}`, `${task}`);
    textarea.value = "";
    btnAll.style.display = "block";
    e.preventDefault();
  } else {
    alert("No ingresaste ninguna tarea");
    textarea.value = "";
  }
}

function addWithEnter(e) {
  if (e.keyCode === 13) addTask(e);
}

function removeTask(e) {
  const erase = document.querySelector(".delete");
  if (e.target.className === "delete") {
    erase.parentElement.remove();
    const parentClass = erase.parentElement.className;
    const toDelete = erase.parentElement.id;
    localStorage.removeItem(toDelete);
    const childrenItems = list.children;
    const arrayTasks = Array.from(childrenItems);

    if (arrayTasks.length === 0 || arrayTasks === undefined) {
      btnAll.style.display = "none";
    }
    e.preventDefault();
  }
}

function loadTasks() {
  for (let i = 0; i <= localStorage.length - 1; i++) {
    const key = localStorage.key(i);
    list.innerHTML += `<li class="task" id="${key}"> ${localStorage.getItem(
      key
    )}<a class="delete"></a></li>`;
  }

  if (localStorage.length === 0 || localStorage === undefined) {
    btnAll.style.display = "none";
  }
}

function deleteAll(e) {
  const childrenItems = list.children;
  const arrayTasks = Array.from(childrenItems);
  arrayTasks.forEach((task) => {
    task.remove();
  });

  btnAll.style.display = "none";
  localStorage.clear();
  e.preventDefault();
}
