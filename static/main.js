(async function () {
  const fetchAPI = async (url, method = 'GET', data) => {
    const { protocol, hostname, port } = window.location;

    const res = await window.fetch(`${protocol}//${hostname}:${port || 80}/api${url}`, {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: data ? JSON.stringify(data) : null
    });
    // console.log(res);

    if (res.status !== 200) throw new Error(await res.json());
    else return res.json();
  };
  const addTodo = ({ text, status, _id }) => {
    document.getElementById('tasks').insertAdjacentHTML('beforeend',
      `<div class="tasks-single" ${status === 'active' ? '' : 'data-done'} data-todoid=${_id}>
    <div class="tasks-single-checkbox"></div>
    <span class="tasks-single-desc">${text}</span>
    <svg class="tasks-trash" viewBox="0 0 459 459">
    <path d="M76.5,408c0,28.05,22.95,51,51,51h204c28.05,0,51-22.95,51-51V102h-306V408z M408,25.5h-89.25L293.25,0h-127.5l-25.5,25.5    H51v51h357V25.5z" />
    </svg>
    </div>`);
  };

  const renderView = async () => {
    try {
      const tasks = await fetchAPI('/todos');
      for (let task of tasks) {
        addTodo(task);
      }
      if (document.getElementById('user')) document.getElementById('user').remove();
    } catch (ex) {
      window.alert(ex.message);
    }
  };

  document.forms.addTask.addEventListener('submit', async function (e) {
    e.preventDefault();
    try {
      const newTask = await fetchAPI('/todos', 'POST', {
        text: this.text.value
      });

      addTodo(newTask);
      this.text.value = '';
    } catch (ex) {
      window.alert(ex.message);
    }
  });

  document.getElementById('tasks').addEventListener('click', async e => {
    if (e.target && e.target.closest('.tasks-single-checkbox')) {
      const { todoid, done } = e.target.closest('.tasks-single').dataset;

      try {
        await fetchAPI(`/todos/${todoid}`, 'PUT', {
          status: done !== undefined ? 'active' : 'done'
        });

        if (done !== undefined) delete document.querySelector(`#tasks .tasks-single[data-todoid="${todoid}"]`).dataset.done;
        else document.querySelector(`#tasks .tasks-single[data-todoid="${todoid}"]`).dataset.done = '';
      } catch (ex) {
        window.alert(ex.message);
      }
    }
  });

  document.getElementById('tasks').addEventListener('click', async e => {
    if (e.target && e.target.closest('.tasks-trash')) {
      const { todoid } = e.target.closest('.tasks-single').dataset;

      try {
        await fetchAPI(`/todos/${todoid}`, 'DELETE');

        document.querySelector(`#tasks .tasks-single[data-todoid="${todoid}"]`).remove();
      } catch (ex) {
        window.alert(ex.message);
      }
    }
  });

  document.forms.register.addEventListener('submit', async function (e) {
    e.preventDefault();
    try {
      await fetchAPI('/users', 'POST', {
        name: this.name.value,
        email: this.email.value,
        password: this.password.value
      });

      renderView();
    } catch (ex) {
      window.alert(ex.message);
    }
  });

  document.forms.login.addEventListener('submit', async function (e) {
    e.preventDefault();

    try {
      await fetchAPI('/auth', 'POST', {
        email: this.email.value,
        password: this.password.value
      });
      renderView();
    } catch (ex) {
      window.alert(ex.message);
    }
  });

  document.getElementById('logout').addEventListener('click', async e => {
    try {
      await fetchAPI('/logout');
      window.location.reload();
    } catch (ex) {
      window.alert(ex.message);
    }
  });

  if (document.cookie.includes('login-token')) {
    try {
      await fetchAPI('/auth');
      renderView();
    } catch (ex) {
      window.alert(ex.message);
    }
  }
})();
