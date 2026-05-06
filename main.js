let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.screenY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a [href*=' + id + ']').classList.add('active');
            })
        }
    })
}

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        console.log(data) 
        Swal.fire({
            title: 'Sending ...',
            text: 'Please wait a moment ^-^!',
            allowOutsideClick: false,
            background: '#1f242d', 
            color: '#fff',       
            didOpen: () => {
                Swal.showLoading();
            },
            customClass: {
                popup: 'my-custom-popup',     
                title: 'my-custom-title',     
                htmlContainer: 'my-custom-text', 
                closeButton: 'my-custom-close'
            }
        });
        setTimeout(() => {
            fetch(contactForm.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data) 
            })
            .then(response => {
                if (response.ok) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Thank you! Your message has been sent.',
                        icon: 'success',
                        background: '#1f242d', 
                        color: '#fff',
                        showConfirmButton: false, 
                        showCloseButton: true,
                        timer: 5000,
                        customClass: {
                            popup: 'my-custom-popup',     
                            title: 'my-custom-title',     
                            htmlContainer: 'my-custom-text', 
                            closeButton: 'my-custom-close'
                        }
                    });
                    contactForm.reset(); 
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            let errorMsgs = data["errors"].map(error => error["message"]).join(", ");
                            Swal.fire({
                                title: 'Something went wrong!',
                                text: errorMsgs,
                                icon: 'warning',
                                background: '#1f242d',
                                color: '#fff',
                                showConfirmButton: false, 
                                showCloseButton: true,
                                timer: 5000,
                                customClass: {
                                    popup: 'my-custom-popup',     
                                    title: 'my-custom-title',     
                                    htmlContainer: 'my-custom-text', 
                                    closeButton: 'my-custom-close'
                                }
                            });
                        } else {
                            Swal.fire({
                                title: 'Error!',
                                text: 'Failed to send the message. Please try again!',
                                icon: 'error',
                                background: '#1f242d',
                                color: '#fff',
                                showConfirmButton: false, 
                                showCloseButton: true,
                                timer: 5000,
                                customClass: {
                                    popup: 'my-custom-popup',     
                                    title: 'my-custom-title',     
                                    htmlContainer: 'my-custom-text', 
                                    closeButton: 'my-custom-close'
                                }
                                    });
                                }
                    });
                }
            })
            .catch(error => {
                console.error("Error:", error);
                Swal.fire({
                    title: 'Connection Error!',
                    text: 'Sorry, unable to connect to the server right now.',
                    icon: 'error',
                    background: '#1f242d',
                    color: '#fff',
                    showConfirmButton: false, 
                    showCloseButton: true,
                    timer: 5000,
                    customClass: {
                        popup: 'my-custom-popup',     
                        title: 'my-custom-title',     
                        htmlContainer: 'my-custom-text', 
                        closeButton: 'my-custom-close'
                    }
                });
            });
        }, 2000);
    });
}