document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

function initApp() {
    navFixed();
    createGallery();
    scrollNav();
}

// Set the scroll bar to a certain position
function navFixed() {
    const bar = document.querySelector('.header');
    const aboutFestival = document.querySelector('.about-festival');
    const body = document.querySelector('body');


    window.addEventListener('scroll', function() {
        if( aboutFestival.getBoundingClientRect().bottom < 0  ) {
            bar.classList.add('fixed-bar');
            body.classList.add('body-scroll');
        } else {
            bar.classList.remove('fixed-bar');
            body.classList.remove('body-scroll');
        }
    });
}

// Smooth scroll effect ( for the links )
function scrollNav() {  
    const links = document.querySelectorAll('.main-nav a');

    links.forEach( link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const sectionScroll = e.target.attributes.href.value;
            const section = document.querySelector(sectionScroll);
            section.scrollIntoView({ behavior: "smooth"});
        });
    });
}

function createGallery() {

    const gallery = document.querySelector('.gallery-images');

    for(let i = 1; i <= 12; i++ ) {

        const image = document.createElement('picture');
        image.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="Image gallery">
        `;
        
        image.onclick = function() {
            showImage(i);
        }

        gallery.appendChild(image);
    }

}

function showImage(idImagen) {
    const image = document.createElement('picture');
    image.innerHTML = `
        <source srcset="build/img/big/${idImagen}.avif" type="image/avif">
        <source srcset="build/img/big/${idImagen}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/big/${idImagen}.jpg" alt="Image gallery">
    `;

    // Create the Overlay with the image
    const overlay = document.createElement('DIV');
    overlay.appendChild(image);
    overlay.classList.add('overlay');
    overlay.onclick = function() {
        const body = document.querySelector('body');
        body.classList.remove('fixed-body');
        overlay.remove();
    }

    // Button to close the modal
    const closeModal = document.createElement('P');
    closeModal.textContent = 'X';
    closeModal.classList.add('btn-close');
    closeModal.onclick = function() {
        const body = document.querySelector('body');
        body.classList.remove('fixed-body');
        overlay.remove();
    }
    overlay.appendChild(closeModal);

    // Add it to the HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fixed-body');
}