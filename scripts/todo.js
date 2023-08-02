'use strict';
const addBtn = document.querySelector('#btn-add');
const tasksContainer = document.querySelector('#todo-list');
const inputTaskEl = document.querySelector('#input-task');

// Class TodoTask
class TodoTask {
  constructor(taskInfo) {
    this.owner = taskInfo.owner;
    this.task = taskInfo.task;
    this.isDone = taskInfo.isDone;
  }
}

// Hàm render tất cả tasks của currentUser
function renderTasks() {
  tasksContainer.innerHTML = '';
  todoArr.forEach((task, i) => {
    if (task.owner !== currentUser.username) return;
    const taskEl = `<li class="task ${
      task.isDone ? 'checked' : ''
    }" data-task-index=${i}>${task.task}<span class="close">×</span></li>`;
    tasksContainer.insertAdjacentHTML('beforeend', taskEl);
  });
}

// Hàm thêm task mới vào todoArr & cập nhật todoArr vào local storage
function addTask() {
  const taskContent = inputTaskEl.value.trim();
  if (!taskContent) {
    alert('Please input task!');
    return;
  }
  const newTaskInfo = {
    owner: currentUser.username,
    task: taskContent,
    isDone: false,
  };
  const newTask = new TodoTask(newTaskInfo)
  todoArr.push(newTask);
  renderTasks();
  saveToStorage(todoArrKey, todoArr);
  inputTaskEl.value = '';
}
// Hàm thay đổi trạng thái của task
function toggleTask(e) {
  const currentTaskIndex = e.target.dataset.taskIndex; // Index của task đang chọn
  const currentTask = todoArr[currentTaskIndex]; // Task đang chọn
  // Toggle task đang chọn
  if (currentTask.isDone) {
    // Nếu task đang ở trạng thái đã hoàn thành
    e.target.classList.remove('checked');
    currentTask.isDone = false;
    saveToStorage(todoArrKey, todoArr);
  } else {
    // Nếu task đang ở trạng thái chưa hoàn thành
    e.target.classList.add('checked');
    currentTask.isDone = true;
    saveToStorage(todoArrKey, todoArr);
  }
}
// Hàm xóa task
function deleteTask(e) {
  const currentTaskEl = e.target.parentElement; // Element hiển thị task đang chọn
  const currentTaskIndex = currentTaskEl.dataset.taskIndex; // Index của task đang chọn trong todoArr
  todoArr.splice(currentTaskIndex, 1); // Xóa task đang chọn khỏi todoArr
  renderTasks();  //  Render lại các task
  saveToStorage(todoArrKey, todoArr);
}
// Hiển thị task và xử lý các sự kiện nếu người dùng đã login
if (currentUser) {
  renderTasks();
  addBtn.addEventListener('click', addTask);
  tasksContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('task')) toggleTask(e);
    if (e.target.classList.contains('close')) deleteTask(e);
  });
} else {
  tasksContainer.textContent = 'Please login to use this feature!';
}
