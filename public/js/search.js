const searchFormHandler = async (event) => {
    event.preventDefault();
    var categoryEL = document.querySelector('#category').value;

    if (categoryEL === 'LENSES') {
        const response = await fetch(`/`, {
            method: 'GET',
        });
        if (response.ok) {
            document.location.replace('/?filter=LENSES');
        } else {
            alert('Failed to filter listings');
        }
    }
    else if (categoryEL === 'BODY') {
        const response = await fetch(`/`, {
            method: 'GET',
        });
        if (response.ok) {
            document.location.replace('/?filter=BODY');
        } else {
            alert('Failed to filter listings');
        }
    }
    else if (categoryEL === 'FLASH') {
        const response = await fetch(`/`, {
            method: 'GET',
        });
        if (response.ok) {
            document.location.replace('/?filter=FLASH');
        } else {
            alert('Failed to filter listings');
        }
    }
    else if (categoryEL === 'LIGHTS') {
        const response = await fetch(`/`, {
            method: 'GET',
        });
        if (response.ok) {
            document.location.replace('/?filter=LIGHTS');
        } else {
            alert('Failed to filter listings');
        }
    }  
    else {
        const response = await fetch(`/`, {
            method: 'GET',
        });
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to clear filter');
        }
        console.log('Failed to filter listings')
    }
};

const clearFormHandler = async (event) => {
    event.preventDefault();

    const response = await fetch(`/`, {
        method: 'GET',
    });
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to clear filter');
    }
};

document
    .querySelector('.search-form')
    .addEventListener('submit', searchFormHandler);

document
    .querySelector("#clear-btn")
    .addEventListener("submit", clearFormHandler);