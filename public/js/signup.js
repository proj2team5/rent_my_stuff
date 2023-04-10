const signupFormHandler = async(event) => {
// this function handles the submit event of the sign up form
// It passes the username, email, and password to the /api/users/ route which will create a user
    event.preventDefault();
    // get data from form
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

  
    if (username && email && password) { // validate form data has been filled
        const response = await fetch('/api/users/', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        })

        if (response.ok) {
            alert('You have signed up!')
            document.location.replace('/');
        } else {
            alert('Failed to sign up.');
        }
    }
};

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
