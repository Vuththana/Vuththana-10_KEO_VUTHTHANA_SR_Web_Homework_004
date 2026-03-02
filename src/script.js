// ADD TASK
let addTaskForm = document.getElementById("add-form");
let showAddTaskForm = document.getElementById("show-add-form");
let closeAddTaskForm = document.getElementById("close-add-form");
let addTaskFormSubmit = document.getElementById("add-form");

// DELETE TASK
let deleteForm = document.getElementById("delete");
let yesButton = document.getElementById("yes-button");
let noButton = document.getElementById("no-button");


let tbody = document.getElementById("tbody");

let task = document.getElementById("addTask");

let tasks = JSON.parse(localStorage.getItem("tasks") || '[]');

function getSelectedStatus() {
  const radios = document.getElementsByName("status");
  for (let radio of radios) {
    if (radio.checked) {
      return radio.value;
    }
  }
  return null;
}

function getSelectedPriority() {
  const radios = document.getElementsByName("priority");
  for (let radio of radios) {
    if (radio.checked) {
      return radio.value;
    }
  }
  return null;
}

function showTaskToTable() {
  tbody.innerHTML = "";

  JSON.parse(localStorage.getItem("tasks") || '[]').forEach((taskValue, index) => {
    let tr = document.createElement("tr");
    tr.className = "w-full h-[80px] bg-white text-[20px] font-[800]";

    let td1 = document.createElement("td");
    td1.innerHTML = taskValue.taskName;
    td1.className = "font-[700] px-12 max-w-[70px] rounded-tl-[15px]";
    tr.appendChild(td1);

    let td2 = document.createElement("td");
    td2.innerHTML =
      taskValue.taskPriority.charAt(0).toUpperCase() +
      taskValue.taskPriority.slice(1);
    td2.className =
      "font-[700] " +
      (taskValue.taskPriority === "high"
        ? "text-red-500"
        : taskValue.taskPriority === "medium"
          ? "text-yellow-500"
          : "text-green-500");
    tr.appendChild(td2);

    let td3 = document.createElement("td");
    td3.className = "font-[700]";
    td3.innerHTML = taskValue.taskStatus == "todo" ? "To Do" :
      taskValue.taskStatus.charAt(0).toUpperCase() +
      taskValue.taskStatus.slice(1);
    tr.appendChild(td3);

    let td4 = document.createElement("td");
    let editIcon = document.createElement("i");
    let trashIcon = document.createElement("i");
    let div = document.createElement("div");
    td4.className = "rounded-br-[15px]"
    editIcon.className = "fas fa-edit text-purple-500 text-[30px]";
    editIcon.addEventListener("click", () => {
      updateTaskFromList(index)
    })
    trashIcon.className = "fas fa-trash text-red-500 text-[30px]";
    trashIcon.addEventListener("click", () => {
      areYouSure(index);
    });
    div.appendChild(editIcon);
    div.appendChild(trashIcon);
    div.className = "flex gap-[20px]";
    td4.appendChild(div);
    tr.appendChild(td4);

    tbody.appendChild(tr);
  });
}

function areYouSure(index) {
  deleteForm.className =
    "absolute inset-0 flex flex-col justify-center items-center bg-black/50";
  yesButton.addEventListener("click", () => {
    deleteForm.className = "hidden";
    let tasks = JSON.parse(localStorage.getItem("tasks") || []);
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks))
    showTaskToTable(tasks);
  });
  noButton.addEventListener("click", () => {
    deleteForm.className = "hidden";
  })
}

function addTaskToList(taskValue, priority, status) {
  tasks.push({
    taskName: taskValue,
    taskPriority: priority,
    taskStatus: status,
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showTaskToTable();
}

// Add Task Form
showAddTaskForm.addEventListener("click", () => {
  addTaskFormSubmit.className =
    "absolute inset-0 flex flex-col justify-center items-center bg-black/50";
});

closeAddTaskForm.addEventListener("click", () => {
  addTaskFormSubmit.className = "hidden";
});

addTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    task.value == "" ||
    getSelectedPriority() == null ||
    getSelectedStatus() == null
  ) {
    alert("All fields must be filled.");
    return;
  }
  addTaskToList(task.value, getSelectedPriority(), getSelectedStatus());
  addTaskFormSubmit.className = "hidden";
});

// Update Task Form

// UPDATE TASK
let updateForm = document.getElementById("update-form");
let updateTaskForm = document.getElementById("update-task-form");
let closeUpdateTaskForm = document.getElementById("update-task-cancel");
let updateTask = document.getElementById("update-task");
let updatedIndex = null

function updateTaskFromList(index) {  
  updatedIndex = index;
  updateForm.className =
    "absolute inset-0 flex flex-col justify-center items-center bg-black/50";
  let updatedTask = JSON.parse(localStorage.getItem("tasks") || '[]')[index];
  updateTask.value = updatedTask.taskName;
  const priorities = document.getElementsByName("update-priority");
  for (let priority of priorities) {
    priority.checked = (priority.value === updatedTask.taskPriority);
  }
  const statuses = document.getElementsByName("update-status");
  for (let status of statuses) {
    status.checked = (status.value === updatedTask.taskStatus);
  }
}

function getSelectedUpdatedStatus() {
  const radios = document.getElementsByName("update-status");
  for (let radio of radios) {
    if (radio.checked) {
      return radio.value;
    }
  }
  return null;
}

function getSelectedUpdatedPriority() {
  const radios = document.getElementsByName("update-priority");
  for (let radio of radios) {
    if (radio.checked) {
      return radio.value;
    }
  }
  return null;
}

updateTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (updateTask.value == ""
    || getSelectedUpdatedPriority() == null
    || getSelectedUpdatedStatus() == null
  ) {
    alert("All fields must be filled.");
    return
  }
  updateTaskFormToList(updatedIndex, updateTask.value);
})

function updateTaskFormToList(index, taskValue) {
  let tasks = JSON.parse(localStorage.getItem("tasks") || '[]');
  tasks[index].taskName = taskValue;
  tasks[index].taskPriority =  getSelectedUpdatedPriority();
  tasks[index].taskStatus = getSelectedUpdatedStatus();
  localStorage.setItem("tasks", JSON.stringify(tasks));
  updateTaskForm.submit();
  showTaskToTable();
}

closeUpdateTaskForm.addEventListener("click", () => {
  updateForm.className
    = "hidden";
})

showTaskToTable();