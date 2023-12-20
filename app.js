document.addEventListener('DOMContentLoaded', () => {
    loadTasksFromLocalStorage();
  });
  
  function addTask() {
    const inputField = document.getElementById('newTaskInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const taskText = inputField.value.trim();
    const priority = prioritySelect.value;
  
    if (taskText !== '') {
      const toDoList = document.getElementById('toDoList');
  
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
  
      const label = document.createElement('label');
      label.className = priority + '-priority';
      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(taskText));
  
      label.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        showContextMenu(e, label);
      });
  
      toDoList.appendChild(label);
  
      saveTaskToLocalStorage(label, priority);
  
      inputField.value = ''; 
    }
  }
  
  function deleteTask(label) {
    const toDoList = document.getElementById('toDoList');
    toDoList.removeChild(label);
    removeTaskFromLocalStorage(label);
  }
  
  function editTask(label) {
    const newText = prompt('Edit task:', label.innerText);
  
    if (newText !== null) {
      label.childNodes[1].nodeValue = newText;
      updateTaskInLocalStorage(label);
    }
  }
  
  function showContextMenu(e, label) {
    const contextMenu = document.createElement('div');
    contextMenu.className = 'context-menu';
    contextMenu.innerHTML = `
      <div onclick="editTask(this.parentElement.parentElement)">Edit</div>
      <div onclick="deleteTask(this.parentElement.parentElement)">Delete</div>
    `;
  
    contextMenu.style.top = e.clientY + 'px';
    contextMenu.style.left = e.clientX + 'px';
  
    document.body.appendChild(contextMenu);
  
    document.addEventListener('click', () => {
      document.body.removeChild(contextMenu);
    });
  }
  
  function saveTaskToLocalStorage(label, priority) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = { text: label.innerText, priority: priority };
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  function removeTaskFromLocalStorage(label) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => task.text !== label.innerText);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }
  
  function updateTaskInLocalStorage(label) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const index = tasks.findIndex(task => task.text === label.innerText);
    if (index !== -1) {
      tasks[index].text = label.innerText;
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }
  
  function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const toDoList = document.getElementById('toDoList');
  
    tasks.forEach(task => {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
  
      const label = document.createElement('label');
      label.className = task.priority + '-priority';
      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(task.text));
  
      label.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        showContextMenu(e, label);
      });
  
      toDoList.appendChild(label);
    });
  }
  