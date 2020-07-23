const textarea = document.querySelector("#textarea");
const button = document.querySelector("#btn__task");
const list = document.querySelector(".task-list");

button.addEventListener("click", (e) => {
  const task = textarea.value;
  let sizeStorage = localStorage.length;
  localStorage.setItem(`task ${sizeStorage + 1}`, `${task}`);
  list.innerHTML += `<li class="task"> ${task}</li>`;
  textarea.value = "";
  e.preventDefault();
});

document.addEventListener("DOMContentLoaded", () => {
  for (let i = 0; i <= localStorage.length - 1; i++) {
    const key = localStorage.key(i);
    console.log(i);
    console.log(key);
    list.innerHTML += `<li class="task"> ${localStorage.getItem(key)}</li>`;
  }
});
