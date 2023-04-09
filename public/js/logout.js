const logout = async () => {
  // handles the login

  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
 // redirect to the homepage
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to sign up.');
  }
};

document.querySelector('#logout').addEventListener('click', logout);
