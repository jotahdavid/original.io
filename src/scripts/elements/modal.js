import NewsletterStore from '../store/NewsletterStore.js';

const $portal = document.querySelector('.portal');
const $modal = $portal.querySelector('.modal');
const $email = $modal.querySelector('.modal__email');

function handleModalConfirm() {
  $portal.classList.remove('show-modal');

  $email.textContent = null;
}

export function addModalEvents() {
  const $button = $modal.querySelector('.modal__confirm');

  $button.addEventListener('click', handleModalConfirm);

  NewsletterStore.subscribe(() => {
    const {
      isSubmitting,
      fields: { email },
    } = NewsletterStore.getState();

    if (!isSubmitting) return;

    $email.textContent = `"${email}"`;

    $portal.classList.add('show-modal');
  });
}
