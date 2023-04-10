const deleteListingHandler = async (event) => {
// handles deletion of gear 
    event.preventDefault();
    // get data from hidden input
    const listingId = document.querySelector('input[name="gear-id"]').value;
    // send DELETE request to remove gear
    const response = await fetch(`/api/gear/${listingId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    // redirects to user page if error else sends alert
    if (response.ok) {
        document.location.replace('/users');
    } else {
        alert('Failed to delete post.');
    }
};

document
    .querySelector('#delete-btn')
    .addEventListener('click', deleteListingHandler);