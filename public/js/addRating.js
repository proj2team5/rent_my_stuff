const newRatingHandler = async (event) => {
    event.preventDefault();

    const rating = document.querySelector('#rating').value.trim();
    const comment = document.querySelector('#comment').value.trim();
    const gear_id = document.querySelector('input[name="gear-id"]').value;


    const response = await fetch(`/api/rate/${gear_id}`, {
        method: 'POST',
        body: JSON.stringify({ rating, comment }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to create new rating');
    }
};

document
    .querySelector('.new-rating-form')
    .addEventListener('submit', newRatingHandler);