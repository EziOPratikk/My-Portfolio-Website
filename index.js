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
        scrollHandler(homeSectionElement);
        break;
      case 'js-about':
        scrollHandler(aboutSectionElement);
        break;
      case 'js-projects':
        scrollHandler(projectsSectionElement);
        break;
      case 'js-contact':
        scrollHandler(contactSectionElement);
        break;
      default:
        console.log('Error occured!');
    }
  });
});

// Scroll down to contact section when clicked on 'Get in Touch' button
const getInTouchButtonElement = document.querySelector('.js-get-in-touch-btn');
getInTouchButtonElement.addEventListener('click', () => {
  scrollHandler(contactSectionElement);

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

function scrollHandler(sectionName) {
  sectionName.scrollIntoView();
}

const sendButton = document.querySelector('.js-send-button');
const snackbarDivElement = document.getElementById('snackbar-container');

sendButton.addEventListener('click', (e) => {
  e.preventDefault();

  // const paragraphElement = document.createElement('p');
  // paragraphElement.textContent = 'Email sent successfully! Thank you.';
  // snackbar.appendChild(paragraphElement);

  snackbarDivElement.style.display = 'flex';

  setTimeout(() => {
    snackbarDivElement.style.display = 'none';
  }, 5000);
});
