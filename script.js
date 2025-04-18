$(document).ready(function () {
    function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      $('#taskList').empty();
  
      tasks.forEach((taskObj, index) => {
        $('#taskList').append(`
          <div class="task-item" data-index="${index}">
            <input type="checkbox" class="select-task me-2">
            <span class="fw-bold me-2">${index + 1}.</span>
            <span class="task-text">${taskObj.name}</span>
            <div class="btn-group ms-auto">
              <button class="btn btn-sm btn-warning edit-btn">Edit</button>
              <button class="btn btn-sm btn-danger delete-btn">Delete</button>
            </div>
          </div>
        `);
      });
    }
  
    function saveTasks(tasks) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    function addTask() {
      const taskName = $('#taskInput').val().trim();
      if (taskName) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ name: taskName, completed: false });
        saveTasks(tasks);
        $('#taskInput').val('');
        loadTasks();
      }
    }
  
    $('#addTaskBtn').click(addTask);
    $('#taskInput').keypress(function (e) {
      if (e.which === 13) addTask();
    });
  
    $('#taskList').on('click', '.delete-btn', function () {
      const index = $(this).closest('.task-item').data('index');
      let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.splice(index, 1);
      saveTasks(tasks);
      loadTasks();
    });
  
    $('#taskList').on('click', '.edit-btn', function () {
      const $item = $(this).closest('.task-item');
      const index = $item.data('index');
      const taskText = $item.find('.task-text').text();
      $('#editTaskInput').val(taskText);
      $('#editTaskIndex').val(index);
      const modal = new bootstrap.Modal(document.getElementById('editModal'));
      modal.show();
    });
  
    $('#saveEditBtn').click(function () {
      const index = $('#editTaskIndex').val();
      const updatedText = $('#editTaskInput').val().trim();
      if (updatedText) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks[index].name = updatedText;
        saveTasks(tasks);
        loadTasks();
        const modal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
        modal.hide();
      }
    });
  
    $('#deleteSelectedBtn').click(function () {
      let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const selectedIndexes = [];
  
      $('.select-task:checked').each(function () {
        const index = $(this).closest('.task-item').data('index');
        selectedIndexes.push(index);
      });
  
      selectedIndexes.sort((a, b) => b - a).forEach(i => tasks.splice(i, 1));
      saveTasks(tasks);
      loadTasks();
    });
  
    loadTasks();
  });
  