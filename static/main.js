const { protocol, hostname, port } = window.location;

document.forms.register.addEventListener('submit', async function (e) {
  e.preventDefault();

  const res = await window.fetch(`${protocol}//${hostname}:${port || 80}/api/users`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: this.name.value,
      email: this.email.value,
      password: this.password.value
    })
  });
  console.log(res.body);
});

document.forms.login.addEventListener('submit', async function (e) {
  e.preventDefault();

  const res = await window.fetch(`${protocol}//${hostname}:${port || 80}/api/auth`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: this.email.value,
      password: this.password.value
    })
  });
  console.log(res);
});
