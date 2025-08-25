let $ = document;
let counter = 0;
let allTask = [];
let editId = null;

let noTask = $.querySelector(".no-task");
let newToDoElem = $.querySelector(".result-container");
let input = $.querySelector("#input");
let all = $.querySelector(".all");
let pending = $.querySelector(".pending");
let completed = $.querySelector(".completed");

function addNewToDo(newTask) {
  let taskContainer = $.createElement("div");
  taskContainer.className = "task-container";

  let inputTask = $.createElement("div");
  inputTask.className = "input-task";

  let inputName = $.createElement("input");
  inputName.className = "input-del";
  inputName.setAttribute("type", "checkbox");
  inputName.setAttribute("id", "task" + counter.toString());
  inputName.setAttribute("onclick", "del()");

  let label = $.createElement("label");
  label.setAttribute("for", "task" + counter.toString());
  label.setAttribute("id", "label" + counter.toString());
  label.className = "label";
  label.innerHTML = newTask;

  let menu = $.createElement("div");
  menu.className = "show-menu hidden";

  let editOption = $.createElement("p");
  editOption.innerText = "Edit";
  editOption.setAttribute("onclick", `editTask('task${counter}')`);

  let deleteOption = $.createElement("p");
  deleteOption.innerText = "Delete";
  deleteOption.setAttribute("onclick", `deleteTask('task${counter}')`);

  menu.append(editOption, deleteOption);

  inputTask.append(inputName, label);

  let icon = $.createElement("i");
  icon.className = "fa fa-ellipsis-h icon";
  icon.setAttribute("onclick", "toggleMenu(event)");

  taskContainer.append(inputTask, icon, menu);

  if (counter > 1) {
    taskContainer.style.borderTop = "1px solid black";
  }
  newToDoElem.append(taskContainer);

  let newTaskObj = { id: counter.toString(), name: newTask, state: "pending" };

  allTask.push(newTaskObj);
}

function reader(event) {
  let newTask = event.target.value.trim();

  if (event.keyCode === 13) {
    if (!newTask) return;
    if (editId !== null) {
      allTask = allTask.map((task) => {
        if (task.id === editId.replace("task", "")) {
          const label = $.querySelector(`label[for=${editId}]`);
          label.innerText = newTask;
          return { ...task, name: newTask };
        }
        return task;
      });
    } else {
      noTask.style.display = "none";
      counter++;
      addNewToDo(newTask);
    }
    input.value = "";
  }
}

function click1() {
  allFlag = 2;
  all.style.color = "rgb(66, 66, 255)";
  pending.style.color = "black";
  completed.style.color = "black";

  allTask.forEach((task) => {
    const taskElem = $.getElementById("task" + task.id).closest(
      ".task-container"
    );
    taskElem.style.display = "flex";
  });
}
function click2() {
  pending.style.color = "rgb(66, 66, 255)";
  all.style.color = "black";
  completed.style.color = "black";

  allTask.forEach((task) => {
    const taskElem = $.getElementById("task" + task.id).closest(
      ".task-container"
    );
    if (task.state === "pending") {
      taskElem.style.display = "flex";
    } else {
      taskElem.style.display = "none";
    }
  });
}
function click3() {
  completed.style.color = "rgb(66, 66, 255)";
  all.style.color = "black";
  pending.style.color = "black";

  allTask.forEach((task) => {
    const taskElem = $.getElementById("task" + task.id).closest(
      ".task-container"
    );
    if (task.state === "completed") {
      taskElem.style.display = "flex";
    } else {
      taskElem.style.display = "none";
    }
  });
}

function del() {
  for (let i = 1; i <= allTask.length; i++) {
    let check = $.getElementById("task" + i.toString());
    let removeLabel = $.getElementById("label" + i.toString());
    if (check.checked == true) {
      removeLabel.style.textDecoration = "line-through";
      allTask[i - 1].state = "completed";
    }
  }
}

function toggleMenu(event) {
  const allMenus = document.querySelectorAll(".show-menu");
  const currentMenu = event.target.nextElementSibling;

  allMenus.forEach((menu) => {
    if (menu !== currentMenu) {
      menu.classList.add("hidden");
    }
  });

  currentMenu.classList.toggle("hidden");
}

function deleteTask(taskId) {
  const taskElem = $.getElementById(taskId).closest(".task-container");
  taskElem.remove();
  allTask = allTask.filter((task) => task.id !== taskId.replace("task", ""));
}

function editTask(taskId) {
  const allMenus = document.querySelectorAll(".show-menu");
  allMenus.forEach((menu) => menu.classList.add("hidden"));
  editId = taskId;
  const label = $.querySelector(`label[for=${taskId}]`);
  input.value = label.innerText;
}

function clearAllTasks() {
  allTask = [];
  counter = 0;
  editId = null;
  noTask.style.display = "block";
  newToDoElem.innerHTML = "";
}
