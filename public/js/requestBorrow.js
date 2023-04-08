


const requestButtonHandler = async (event) => { 

    const gearid = requestButton.dataset.id
    const ownerid = requestButton.dataset.owner
    console.log(gearid)
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

    if (loanResponse.ok) {
    document.location.replace('/users');
    } else {
    alert('Failed change availability.');
    }
};

const requestButton = document.querySelector("#request-borrow");
const costPerDay = document.querySelector("#costPerDay").dataset.amount;
requestButton.addEventListener('click', requestButtonHandler);
