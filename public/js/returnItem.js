
const returnButtonHandler = async (event) => { 
    // handles the return button by updating the loan status to 'RETURNED'
    // after the api call is successful it redirects user to rate the borrower.

    // pulling data from data attribute in button
    const ID = event.target.dataset.id
    const gearID = event.target.dataset.gear
    const lenderID = event.target.dataset.lender
    // get current timestamp
    const receivedDate = Date.now();
    // update loan status RETURNED
    const loanResponse = await fetch(`/api/loans/${ID}`, {
        method: 'PUT',
        body: JSON.stringify({status: 'RETURNED', returned_date: receivedDate}),
        headers: { 'Content-Type': 'application/json' },
    });

    //if status updated redirect to rate page
    if (loanResponse.ok) {
    document.location.replace(`/users/rate/${lenderID}?type=LENDER&gearid=${gearID}`);
    } else {
    alert('Failed change loan status.');
    }

};

const deleteButtonHandler = async (event) => { 
// if borrow request is denied the user as the borrower will then delete the loan

    // pulling data from data attribute in button
    const ID = event.target.dataset.id
    const Response = await fetch(`/api/loans/${ID}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    if (Response.ok) {
    document.location.replace('/users');
    } else {
    alert('Failed to delete loan');
    }
};

var returnButton = document.querySelectorAll(".returnButton");
var deleteButton = document.querySelectorAll(".deleteButton");
returnButton.forEach((element) => element.addEventListener('click',returnButtonHandler))
deleteButton.forEach((element) => element.addEventListener('click',deleteButtonHandler))
