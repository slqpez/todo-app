const textarea = document.querySelector("#textarea");
const button = document.querySelector("#btn__task");
const list = document.querySelector(".task-list");

button.addEventListener("click", addTask);
list.addEventListener("click", removeTask);
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask(e) {
  const task = textarea.value;
  const sizeStorage = localStorage.length;
  if (task !== "") {
    list.innerHTML += `<li class="task"> ${task}<a class="delete"></a></li>`;
    localStorage.setItem(`task${sizeStorage + 1}`, `${task}`);
    textarea.value = "";
    e.preventDefault();
  } else {
    alert("No ingresaste ninguna tarea");
  }
}

function removeTask(e) {
  const erase = document.querySelector(".delete");
  if (e.target.className === "delete") {
    erase.parentElement.remove();
    const test = erase.parentElement.className;
    const toDelete = erase.parentElement.textContent;

    for (let i = 0; i <= localStorage.length - 1; i++) {
      const key = localStorage.key(i);
      console.log(localStorage.getItem(key));
      if (localStorage.getItem(key) === toDelete) console.log("estoy borrando");
    }
  }
  e.preventDefault();
}

function loadTasks() {
  for (let i = 0; i <= localStorage.length - 1; i++) {
    const key = localStorage.key(i);
    list.innerHTML += `<li class="task"> ${localStorage.getItem(
      key
    )}<a class="delete"></a></li>`;
  }
}
