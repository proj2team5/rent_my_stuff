const listingId = document.querySelector('input[name="gear-id"]').value;

const editListingHandler = async (event) => {
// function to handle updating the gear   
    event.preventDefault();
  
    // create a formData object and append fields from form
    const formData = new FormData()
    formData.append('product_name', document.querySelector('#product_name').value.trim());
    formData.append('description', document.querySelector('#description').value.trim());
    formData.append('category', document.querySelector('#category').value.trim());
    formData.append('cost_per_day', document.querySelector('#cost_per_day').value.trim());
    formData.append('img_file', event.target.img_file.files[0]);

     // send post request to update a gear listing
    const response = await fetch(`/api/gear/${listingId}`, {
      method: 'PUT',
      body: formData,
    });
    
    // if post request is successful then redirect to the user profile, else send alert 
    if (response.ok) {
      document.location.replace('/users');
    } else {
      alert('Failed to update listing.');
    }
}


  document
    .querySelector('.editListing')
    .addEventListener('submit', editListingHandler);