// when form is submitted grab user's input and log it
user_input_form.addEventListener("submit", (e) => {
    // e is the event object
    // that object holds more information about the event that we are handling
    e=preventDefault();

    const PLACEHOLDER_PHOTO_URL = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dHJhdmVsfGVufDB8fDB8fHww"

    const destinationName = destination_name.value
    const locationName = location_name.value
    const photoUrl = photo_url.value === "" ? PLACEHOLDER_PHOTO_URL : photo_url.value
    // const photoUrl = photo_url.value || PLACEHOLDER_PHOTO_URL //an alternative to the above
    const descr = description.value

    // clear the form
    user_input_form.reset();

    console.log(destinationName, locationName, photoUrl, descr);
})