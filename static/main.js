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
    console.log(res);

    if (res.status !== 200) throw new Error(await res.json());
    else return res.json();
  };

  const renderView = async () => {
    if (document.getElementById('user')) document.getElementById('user').remove();
    try {
      const tasks = await fetchAPI('/todos');
      // for (let task of tasks) {

      // }
      console.log(tasks);
    } catch (ex) {
      window.alert(ex.message);
    }
  };

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
