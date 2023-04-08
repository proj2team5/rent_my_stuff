const confirmButtonHandler = async (event) => { 
    const ID = event.target.dataset.id
    const gearID = event.target.dataset.gear
    const borrowerID = event.target.dataset.borrower

    const gearResponse = await fetch(`/api/gear/${gearID}`, {
        method: 'PUT',
        body: JSON.stringify({available: 1}),
        headers: { 'Content-Type': 'application/json' },
    });

    if (gearResponse.ok) {
        console.log(gearResponse);
    } else {
    alert('Failed change availability.');
    }

    const loanResponse = await fetch(`/api/loans/${ID}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    if (loanResponse.ok) {
    document.location.replace(`/users/rate/${borrowerID}?type=BORROWER&gearid=${gearID}`);
    } else {
    alert('Failed change loan status.');
    }

};

var confirmButtons = document.querySelectorAll(".confirmButton");

confirmButtons.forEach((element) => element.addEventListener('click',confirmButtonHandler))