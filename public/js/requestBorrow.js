
const requestButtonHandler = async (event) => { 
//this function send out borrow request by creating a new loan request

    // pulling data from data attribute in button
    const gearid = requestButton.dataset.id
    const ownerid = requestButton.dataset.owner
    // create a new loan instance with status REQUESTED
    const loanResponse = await fetch(`/api/loans`, {
        method: 'POST',
        body: JSON.stringify(
            {
                product_id: gearid,
                cost_per_day: costPerDay,
                status: 'REQUESTED',
                owner_id: ownerid
            }
        ),
        headers: { 'Content-Type': 'application/json' },
    });
    // redirected from ger detail page to user page where you can see the item you just requested
    if (loanResponse.ok) {
    document.location.replace('/users');
    } else {
    alert('Failed change availability.');
    }
};

const requestButton = document.querySelector("#request-borrow");
const costPerDay = document.querySelector("#costPerDay").dataset.amount;
requestButton.addEventListener('click', requestButtonHandler);
