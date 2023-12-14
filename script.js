// when form is submitted grab user's input and log it
user_input_form.addEventListener("submit", (e) => {
    // e is the event object
    // that object holds more information about the event that we are handling
    e.preventDefault()

    const PLACEHOLDER_PHOTO_URL = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dHJhdmVsfGVufDB8fDB8fHww"

    const destinationName = destination_name.value
    const locationName = location_name.value
    const photoUrl = photo_url.value === "" ? PLACEHOLDER_PHOTO_URL : photo_url.value
    // const photoUrl = photo_url.value || PLACEHOLDER_PHOTO_URL //an alternative to the above
    const descr = description.value

    // clear the form
    user_input_form.reset()

    const card = createCard({destinationName, locationName, photoUrl, descr});
})

function createCard({destinationName, locationName, photoUrl, descr}) {
    /*
    <div class="card" style="width: 18rem;">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>
    */
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("style", "width: 18rem;");
    card.innerHTML = `
    <img src=${photoUrl} class="card-img-top" alt=${destinationName} at ${locationName}>
    <div class="card-body">
        <h5 class="card-title">${destinationName}</h5>
        <p class="card-text">${locationName}</p>
        ${descr && `<p class="card-text">${descr}</p>`}
        <button type="button" class="btn btn-info">Edit</button>
        <button type="button" class="btn btn-danger">Delete</button>
    </div>
    `;
    
    return card
}