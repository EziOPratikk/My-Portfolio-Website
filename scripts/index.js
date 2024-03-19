const homeSectionElement = document.querySelector('.js-home-section');
const aboutSectionElement = document.querySelector('.js-about-section');
const projectsSectionElement = document.querySelector('.js-projects-section');
const contactSectionElement = document.querySelector('.js-contact-section');

const navbarListElements = document.querySelectorAll('.js-navbar-li');

navbarListElements.forEach((listItem) => {
  listItem.addEventListener('click', () => {
    const listItemClass = listItem.classList[0];

    switch (listItemClass) {
      case 'js-home':
        handleScroll(homeSectionElement);
        break;
      case 'js-about':
        handleScroll(aboutSectionElement);
        break;
      case 'js-projects':
        handleScroll(projectsSectionElement);
        break;
      case 'js-contact':
        handleScroll(contactSectionElement);
        break;
      default:
        console.log('Error occured!');
    }
  });
});

// Scroll down to contact section when clicked on 'Get in Touch' button
const getInTouchButtonElement = document.querySelector('.js-get-in-touch-btn');
getInTouchButtonElement.addEventListener('click', () => {
  handleScroll(contactSectionElement);

  // const height = document.body.scrollHeight;
  // window.scroll(0, height);
});

// Scroll to the top when clicked on 'Uparrow' button
const upArrowButtonElement = document.querySelector('.js-up-arrow-box');
upArrowButtonElement.addEventListener('click', () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

// Display the Uparrow button only when user scrolls 100px below
window.onscroll = function () {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    upArrowButtonElement.style.display = 'block';
  } else {
    upArrowButtonElement.style.display = 'none';
  }
};

function handleScroll(sectionName) {
  sectionName.scrollIntoView();
}

const hamburgerMenuIconElement = document.querySelector(
  '.js-hamburger-menu-icon'
);
hamburgerMenuIconElement.addEventListener('click', () => {
  const menuContainerElement = document.querySelector('.js-menu-container');
  if (menuContainerElement.style.display === 'block') {
    menuContainerElement.style.display = 'none';
  } else {
    menuContainerElement.style.display = 'block';
  }
});

const sendButton = document.querySelector('.js-send-button');
const snackbarDivElement = document.getElementById('snackbar-container');

function handleSnackbarRender(message, type) {
  const html = `
    <div class='snackbar js-snackbar'>
      <img
        src='../assets/icons/${type}.png'
        alt=${type}
        class='snackbar-icon'
      />
      <p class='js-snackbar-content'>${message}</p>
    </div>
  `;

  snackbarDivElement.style.display = 'flex';

  setTimeout(() => {
    snackbarDivElement.style.display = 'none';
  }, 5000);

  return html;
}

function handleFormSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const userData = Object.fromEntries(formData);

  fetch('http://localhost:3000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === 'email already exists') {
        return (snackbarDivElement.innerHTML = handleSnackbarRender(
          "Oops! It seems like you've already sent a message. Let's not double up!",
          'warning'
        ));
      }
      snackbarDivElement.innerHTML = handleSnackbarRender(
        data.message,
        'success'
      );
    })
    .catch((e) => {
      snackbarDivElement.innerHTML = handleSnackbarRender(
        'Error occured while sending a message!.',
        'error'
      );
    });

  const contactFormElement = document.getElementById('contact-form');
  contactFormElement.reset();
}
