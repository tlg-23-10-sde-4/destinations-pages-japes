// we need to add an event listener for the page for the user to input data, and submit said data
user_input_form.addEventListener("submit", (e) => {
// e is used as the event object which we will provide more information about
    e.preventDefault();

    //create a container element for the URL of the photo
    const PHOTO_URL = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dHJhdmVsfGVufDB8fDB8fHww"
    //this section, in a way, provides the elements for the new card 
    //each of these objects are refering to their input counterpart on the html page, taking just the contents of what was entered
    const destinationName = destination_name.value
    const locationName = location_name.value
    const photoUrl = photo_url.value === "" ? PHOTO_URL : photo_url.value
    const descr = description.value
    // this will reset the entry forms, from the user
    user_input_form.reset();

    //acts as our constructor for the new box element
    //it takes the entries stored above, as the parameters for the createCard() function
    const card = createCard({destinationName, locationName, photoUrl, descr});
    //this ensures that you actually display and use the card element that you painstakingly created
    cards_container.appendChild(card);
})

function createCard({destinationName, locationName, photoUrl, descr}) {
    //this is our createcard element called above, in line 19
    //it takes the disjointed elements provided and creates the card, appenaded to the card_container div
    //it then creates a new div element
    const card = document.createElement("div");
    // adding a class attribute of card
    card.classList.add("card");
    //this is bootstrap (maybe?) syntax to creat
    card.setAttribute("style", "width: 18rem;");
    // the absolute, literal value of what we are placing in the new element
    // the ${} are escapes that tell the browser/ide that js is present to to process it as such
    card.innerHTML = `
    <img src=${photoUrl} class="card-img-top" alt=${destinationName} at ${locationName}>
    <div class="card-body">
        <h5 class="card-title">${destinationName}</h5>
        <p class="card-text">${locationName}</p>
        ${descr && `<p class="card-text">${descr}</p>`}
        <button type="button" btn_type="edit" class="btn btn-info">Edit</button>
        <button type="button" btn_type="delete" class="btn btn-danger">Delete</button>
    </div>
    `;
    //above, you can see that the buttons are made with the requisite button type attribute, that we created
    // and the button styling element from bootstrap

    return card
}

//this is the event listening that handles the edit and delete buttons
cards_container.addEventListener("click", (e) => {
    //like above this is the event handler object...object
    const clickedElt = e.target

    //the logic behind checking the click event based on button type hardcoded. 
    //my previous iterations have used called the unique ids  
    if (clickedElt.getAttribute("btn_type") === "delete") {
        //if the unique attribute of btn_type delete is present, delete the buttons's handler, and then the box.
        //based on the parentelement parent element
        clickedElt.parentElement.parentElement.remove();
    } else if (clickedElt.getAttribute("btn_type") === "edit") {
        //same logic as above but calls a new function to avoid saturating this area
        handleEdit(clickedElt)
    }
})

function handleEdit(editBtn) {
    // this is our edit button mechanics, the function is called above in the click eventlistener for the buttons
    // below are elements from the previously entered user inputs saved as new elements to compare
    // it is important to store them as new elements in order to properly handle your checks
    const cardBody = editBtn.parentElement
    const oldDestName = cardBody.children[0].textContent;
    const oldLocName = cardBody.children[1].textContent;
    //these are calls to the card body array and taking their content to compare
    //because not all fields are required the synatx of the following line is important as it will still 
    //need a check if it does not exist
    const oldPhotoUrl = cardBody.children[2].getAttribute("src");
    //this is the handler for the textarea comparator
    const oldDesc = cardBody.children[3].tagName === "P" ? cardBody.children[2].textContent : "";

    //these are our new user interface comparators to be edited, or not depending on the logic that follows
    //the new entry will be a propmt given, with the default entry being the old entry
    const newDestName = prompt("Enter new destination name", oldDestName)
    const newLocName = prompt("Enter new location", oldLocName)
    const newPhotoUrl = prompt("Enter new photo URL", oldPhotoUrl)
    const newDescName = prompt("Enter new description", oldDesc)
    
    // this is the logic for testing and comparing the destination input and changes is not null and different
    if (newDestName && newDestName !== oldDestName) {
        cardBody.children[0].textContent = newDestName
    }

    if (newLocName && newLocName !== oldLocName) {
        cardBody.children[1].textContent = newLocName
    }

    if (newPhotoUrl && newPhotoUrl !== oldPhotoUrl) {
        cardBody.children[2].getAttribute("src") = newPhotoUrl
    }

    if (newDescName && newDescName !== oldDesc) {
        cardBody.children[3].textContent = newDescName
    }
}