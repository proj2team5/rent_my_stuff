const searchFormHandler = async (event) => {
    // handles submission of search form
    // by recalling the home route with a query parameter of filter
    // the filter query parameter is equal to the value of the category selected by the user
    event.preventDefault();
    var categoryEL = document.querySelector('#category').value;
    if (categoryEL){
        document.location.replace(`/?filter=${categoryEL}`); //recall the home route with a filter query parameter
    }
};

const clearFormHandler = async (event) => {
    // recalls the home route without query param to see all categories
    event.preventDefault();
    document.location.replace('/');
};

document
    .querySelector('.search-form')
    .addEventListener('submit', searchFormHandler);

document
    .querySelector("#clear-btn")
    .addEventListener("click", clearFormHandler);