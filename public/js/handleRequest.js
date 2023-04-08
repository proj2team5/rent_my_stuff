
const acceptButtonHandler = async (event) => { 
    const gearID = event.target.dataset.gear
    const ID = event.target.dataset.id
    const receivedDate = Date.now();
    const gearResponse = await fetch(`/api/gear/${gearID}`, {
        method: 'PUT',
        body: JSON.stringify({available: 0}),
        headers: { 'Content-Type': 'application/json' },
    });

    if (gearResponse.ok) {
    document.location.replace('/users');
    } else {
    alert('Failed change availability.');
    }

    const loanResponse = await fetch(`/api/loans/${ID}`, {
        method: 'PUT',
        body: JSON.stringify({status: 'RECEIVED', received_date: receivedDate}),
        headers: { 'Content-Type': 'application/json' },
    });

    if (loanResponse.ok) {
    document.location.replace('/users');
    } else {
    alert('Failed change loan status.');
    }

};

const declineButtonHandler = async (event) => { 

    ID = event.target.dataset.id
    const loanResponse = await fetch(`/api/loans/${ID}`, {
        method: 'PUT',
        body: JSON.stringify({status: 'DENIED'}),
        headers: { 'Content-Type': 'application/json' },
    });

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
