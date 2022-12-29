const taskInput = document.getElementById("todo_input_text");
let outputDiv = document.getElementById("output_div");
let selectAll = document.getElementById("select-all");
const uncompletTask = document.getElementById("uncomplettask");
const completeTask = document.getElementById("completetask");
//Getting LocalStorage To Do list
let todos = JSON.parse(localStorage.getItem("todo-list"));

//Function to Add ToDo in The Local Storage
function addTodos() {
  let userTask = taskInput.value.trim();
  if (taskInput.value != "" && userTask) {
    if (!todos) {
      todos = [];
    }
    let taskInfo = {
      name: userTask,
      status: false,
    };
    todos.push(taskInfo);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo();
    taskInput.value = "";
  } else {
    alert("Input box is empty!");
  }
}

//function to show todo-list
function showTodo() {
  let taskList = "";
  if (todos.length > 0) {
    todos.forEach((todo, id) => {
      taskList += `
        <div class="item_div">
          <div class="item_div_checkbox">
              <input type="checkbox" onClick="updateTaskStatus(this,id)" name="todo_checkbox" id="${id}" class="check_box" ${todo.status && "checked"}/>
          </div>
          <div class="data_item" >
              <p id="taskName${id}" class="${todo.status ? "com" : ""}">${todo.name}</p>
          </div>
          <div class="item_div_btn">
            <button onclick="removeTask(${id})" class="del_btn">X</button>
          </div>
        </div>`;
      outputDiv.innerHTML = taskList || ``;
    });
    taskLeft();
  } else {
    outputDiv.innerHTML = `<span class="span">Todo List Is Empty Please Enter New Task</span>`;
    taskLeft();
  }
}
showTodo();

//Function To update the Status On Checkbox Checked
function updateTaskStatus(currentTask, id) {
  let taskName = document.getElementById(`taskName${id}`);
  if (currentTask.checked) {
    taskName.classList.add("com");
    todos[currentTask.id].status = true;
  } else {
    taskName.classList.remove("com");
    todos[currentTask.id].status = false;
    selectAll.checked = false;
  }
  localStorage.setItem("todo-list", JSON.stringify(todos));
  taskLeft();
}

//Function Delete All TODO LIst
function deleteAllTodo() {
  todos = [];
  localStorage.removeItem("todo-list");
  showTodo();
}

//Function Delete TODO LIst ITEM
function removeTask(taskId) {
  todos.splice(taskId, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo();
}

//Function to Show no. Of TODO Task is Left
function taskLeft() {
  let left = document.getElementById("task_left");
  const leftTasks = todos && todos.length > 0 ? todos.filter((tsk) => !tsk.status).length : 0;
  const totalTasks = todos.length;
  completeTask.textContent = totalTasks - leftTasks;
  uncompletTask.textContent = leftTasks;
  left.innerHTML = `All Tasks ${totalTasks}`;
}

function completeAll() {
  todos.map((task) => (task.status = selectAll.checked));
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo();
}
