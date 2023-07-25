'use strict';
class Todo {
  constructor(taskInfo) {
    this.owner = taskInfo.username;
    this.task = taskInfo.task;
    this.isDone = taskInfo.isDone;
  }
}
const addBtn = document.querySelector('#btn-add');
const todoListEl = document.querySelector('#todo-list');
function renderTasks() {}
function addTask() {}
if (currentUser) {
  renderTasks();
  addBtn.addEventListener('click', function () {});
}
