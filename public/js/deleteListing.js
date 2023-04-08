const deleteListingHandler = async (event) => {
    event.preventDefault();

    const listingId = document.querySelector('input[name="gear-id"]').value;

    const response = await fetch(`/api/gear/${listingId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/users');
    } else {
        alert('Failed to delete post.');
    }
};

document
    .querySelector('#delete-btn')
    .addEventListener('click', deleteListingHandler);