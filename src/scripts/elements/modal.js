import NewsletterStore from '../store/NewsletterStore.js';

const $portal = document.querySelector('.portal');
const $modal = $portal.querySelector('.modal');

function handleModalConfirm() {
  $portal.classList.remove('show-modal');
}

export function addModalEvents() {
  const $button = $modal.querySelector('.modal__confirm');
  const $email = $modal.querySelector('.modal__email');

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
