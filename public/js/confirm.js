const confirmButtonHandler = async (event) => { 
// function confirms that the borrowed item has been returned by making the gear available again
// and deleting the loan instance     
    // pulling data from data attribute in button
    const ID = event.target.dataset.id
    const gearID = event.target.dataset.gear
    const borrowerID = event.target.dataset.borrower
    // make product available again
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
    // delete the loan
    const loanResponse = await fetch(`/api/loans/${ID}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    // once the loan is deleted then the lender is redirected to the rating page to rate the borrower
    if (loanResponse.ok) {
        document.location.replace(`/users/rate/${borrowerID}?type=BORROWER&gearid=${gearID}`);
    } else {
        alert('Failed change loan status.');
    }

};

var confirmButtons = document.querySelectorAll(".confirmButton");

confirmButtons.forEach((element) => element.addEventListener('click',confirmButtonHandler))