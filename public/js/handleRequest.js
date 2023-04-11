
const acceptButtonHandler = async (event) => { 
    // handles the accept button by updating the loan status to 'RETURNED' and the availability of the gear to unavailable
    // after the api call is successful it redirects user to rate the borrower.

    // pulling data from data attribute in button
    const gearID = event.target.dataset.gear
    const ID = event.target.dataset.id
    // get current timestamp
    const receivedDate = Date.now();
    // change the status of the product to unavailable
    const gearResponse = await fetch(`/api/gear/${gearID}`, {
        method: 'PUT',
        body: JSON.stringify({available: 0}),
        headers: { 'Content-Type': 'application/json' },
    });
    // redirect back to the user page if api calls work
    if (gearResponse.ok) {
    document.location.replace('/users');
    } else {
    alert('Failed change availability.');
    }
    // update loan status to RECEIVED
    const loanResponse = await fetch(`/api/loans/${ID}`, {
        method: 'PUT',
        body: JSON.stringify({status: 'RECEIVED', received_date: receivedDate}),
        headers: { 'Content-Type': 'application/json' },
    });
    // redirect back to the user page if api calls work
    if (loanResponse.ok) {
    document.location.replace('/users');
    } else {
    alert('Failed change loan status.');
    }

};

const declineButtonHandler = async (event) => { 
    
    // pulling data from data attribute in button
    ID = event.target.dataset.id
    // update loan status to DENIED
    const loanResponse = await fetch(`/api/loans/${ID}`, {
        method: 'PUT',
        body: JSON.stringify({status: 'DENIED'}),
        headers: { 'Content-Type': 'application/json' },
    });
    // redirect back to the user page if api calls work
    if (loanResponse.ok) {
    document.location.replace('/users');
    } else {
    alert('Failed change loan status.');
    }
};

var acceptButtons = document.querySelectorAll(".acceptButton");
var declineButtons = document.querySelectorAll(".declineButton");
acceptButtons.forEach((element) => element.addEventListener('click',acceptButtonHandler))
declineButtons.forEach((element) => element.addEventListener('click',declineButtonHandler))
