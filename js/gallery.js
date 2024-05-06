"use strict";

/**
 * Selects a random full image at the start and displays it.
 */
function showRandomImageAtStart() {
    // TODO: Select all 6 links (<a>) in the thumbnail section. They contain the URLs to the full images.
    const links = document.querySelectorAll('a');
    // TODO: Select a random entry out of these 6.
    const randomIndex = getRandomInt(0, links.length);
    // TODO: Implement switchFullImage() below.
    // TODO: Call switchFullImage() with the URL of the random image and the alt attribute of the thumbnail (it contains the description).
    switchFullImage(links[randomIndex].href, links[randomIndex].querySelector('img').alt);
    // TODO: Set a background color (classes .bg-dark and .text-white) to the card-body of your random image (hint: it's the sibling element of your link).
    const cardBody = links[randomIndex].nextElementSibling;
    cardBody.classList.add('bg-dark', 'text-white');
}

/**
 * Prepare the links on the full images so that they execute the following tasks:
 * - Switch the full image to the one that has been clicked on.
 * - Set the highlight under the current thumbnail.
 * - Load the notes for the current image.
 */
function prepareLinks() {
    // TODO: Select all the 6 links (<a>) in the thumbnail section.
    const links = document.querySelectorAll('a');
    // TODO: Set an event listener for the click event on every <a> element.
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            // Remove the .bg-dark and .text-white classes from the card where it's currently set.
            const currentCard = document.querySelector('.card-body.bg-dark.text-white');
            if (currentCard) {
                currentCard.classList.remove('bg-dark', 'text-white');
            }
            // Add both classes again to the card where the click happened.
            link.nextElementSibling.classList.add('bg-dark', 'text-white');
            // Call switchFullImage() with the URL clicked link and the alt attribute of the thumbnail.
            switchFullImage(link.href, link.querySelector('img').alt);
            // Implement and then call loadNotes() with the key for the current image.
            loadNotes(link.href);
            // Prevent the default action for the link.
            event.preventDefault();
        });
    });
}

/**
 * Stores or deletes the updated notes of an image after they have been changed.
 */
function storeNotes() {
    //TODO Select the notes field and add a blur listener.
    const notes = document.querySelector('#notes');

    //TODO When the notes field loses focus, store the notes for the current image in the local storage.
    notes.addEventListener('blur', function() {
        // Get the key from the currently displayed image's src attribute.
        const key = document.querySelector('.figure-img').src;

        const notesValue = notes.textContent.trim();
        console.log(notesValue);
        // If the notes field is not empty, store the notes in local storage
        if (notesValue !== '') {
            localStorage.setItem(key, notesValue);
        } else {
            localStorage.removeItem(key);
        }
    });
}
/**
 * Switches the full image in the <figure> element to the one specified in the parameter. Also updates the image's alt
 * attribute and the figure's caption.
 * @param {string} imageUrl The URL to the new image (the image's src attribute value).
 * @param {string} imageDescription The image's description (used for the alt attribute and the figure's caption).
 */
function switchFullImage(imageUrl, imageDescription) {
    // TODO: Get the <img> element for the full image. Select it by its class or tag name.
    const fullImage = document.querySelector('.figure-img');
    // TODO: Set its src and alt attributes with the values from the parameters (imageUrl, imageDescription).
    fullImage.src = imageUrl;
    console.log(imageUrl);
    fullImage.alt = imageDescription;
    // TODO: Select the <figcaption> element.
    const figcaption = document.querySelector('figcaption');
    // TODO: Set the description (the one you used for the alt attribute) as its text content.
    figcaption.textContent = imageDescription;
}

/**
 * Loads the notes from local storage for a given key and sets the contents in the notes field with the ID notes.
 * @param {string} key The key in local storage where the entry is found.
 */
function loadNotes(key) {
    // TODO: Select the notes field.
    const notesField = document.querySelector('#notes');
    // TODO: Check the local storage at the provided key.
    const notes = localStorage.getItem(key);
    if (notes !== null) {
        notesField.textContent = notes;
    } else {
        notesField.textContent = 'Enter your notes here!';
    }
    //  - If there's an entry, set the notes field's HTML content to the local storage's content.
    //  - If there's no entry, set the default text "Enter your notes here!".
}

/**
 * Returns a random integer value between min (included) and max (excluded).
 * @param {number} min The minimum value (included).
 * @param {number} max The maximum value (excluded).
 * @returns {number} A random integer value between min (included) and max (excluded).
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Gets the whole thing started.
 */
showRandomImageAtStart();
prepareLinks();
storeNotes();
