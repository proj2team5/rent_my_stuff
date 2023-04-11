var viewRequestBtn = document.getElementById("view-request");
var viewRequestSection = document.querySelector(".view-request");

var requestSection = document.querySelector(".request");

viewRequestBtn.addEventListener('click', viewRequest);

function viewRequest() {
    // hide the section that shows the count of request and show the actual request
    viewRequestSection.style.display = "none"; 
    requestSection.style.display = "block";
};