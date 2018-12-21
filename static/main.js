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

    if (res.status !== '200') throw new Error(res.statusText);
    else return res.json();
  };

  document.forms.register.addEventListener('submit', async function (e) {
    e.preventDefault();
    try {
      const res = await fetchAPI('/users', 'POST', {
        name: this.name.value,
        email: this.email.value,
        password: this.password.value
      });
      console.log(res);
    } catch (ex) {
      window.alert(ex.message);
    }
  });

  document.forms.login.addEventListener('submit', async function (e) {
    e.preventDefault();

    try {
      const res = await fetchAPI('/auth', 'POST', {
        email: this.email.value,
        password: this.password.value
      });
      console.log(res);
    } catch (ex) {
      window.alert(ex.message);
    }
  });

  document.getElementById('logout').addEventListener('click', async e => {
    const res = await fetchAPI('/logout');
    if (res.res === true) window.location.reload();
  });

  if (document.cookie.includes('login-token')) {
    try {
      await fetchAPI('/auth');
    } catch (ex) {
      window.alert(ex.message);
    }
  }
})();
