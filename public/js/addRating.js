const newRatingHandler = async (event) => {
    event.preventDefault();
    const ratingButton = document.querySelector('#save-rating')
    const rating = document.querySelector('#rating').value.trim();
    const comment = document.querySelector('#comment').value.trim();
    const gear_id = ratingButton.dataset.gear;
    const user_id = ratingButton.dataset.user;
    const rating_type = ratingButton.dataset.type;


    const response = await fetch(`/api/ratings`, {
        
        method: 'POST',
        body: JSON.stringify({
             user_id: user_id,
             product_id: gear_id,
             type: rating_type,   
             rating, 
             comment, 
            }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/users');
    } else {
        alert('Failed to create new rating');
    }
};

document
    .querySelector('.new-rating-form')
    .addEventListener('submit', newRatingHandler);