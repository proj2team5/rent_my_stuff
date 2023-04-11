const addListingHandler = async (event) => {
// function to create a gear listing for a user with the given inputs 
    event.preventDefault();

    // create a formData object and append fields from form
    const formData = new FormData()
    formData.append('product_name', document.querySelector('#product_name').value.trim());
    formData.append('description', document.querySelector('#description').value.trim());
    formData.append('category', document.querySelector('#category').value.trim());
    formData.append('cost_per_day', document.querySelector('#cost_per_day').value.trim());
    formData.append('img_file', event.target.img_file.files[0]);
   
    // send post request to create a gear listing
    const response = await fetch('/api/gear', {
      method: 'POST',
      body: formData,
    });
    // redirects to home page if error else sends alert
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to add listing.');
    }

};
  
  document
    .querySelector('.addListing')
    .addEventListener('submit', addListingHandler);