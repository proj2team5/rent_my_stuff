const listingId = document.querySelector('input[name="gear-id"]').value;

const editListingHandler = async (event) => {
    event.preventDefault();
  

    const formData = new FormData()
    formData.append('product_name', document.querySelector('#product_name').value.trim());
    formData.append('description', document.querySelector('#description').value.trim());
    formData.append('category', document.querySelector('#category').value.trim());
    formData.append('cost_per_day', document.querySelector('#cost_per_day').value.trim());
    formData.append('img_file', event.target.img_file.files[0]);


      const response = await fetch(`/api/gear/${listingId}`, {
        method: 'PUT',
        body: formData,
      });
  
      if (response.ok) {
        document.location.replace('/users');
      } else {
        alert('Failed to update listing.');
      }
  }


  document
    .querySelector('.editListing')
    .addEventListener('submit', editListingHandler);