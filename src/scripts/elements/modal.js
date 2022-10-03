import Modal from '../components/Modal.js';
import NewsletterStore from '../store/NewsletterStore.js';
import createElement from '../utils/createElement.js';

const $portal = document.querySelector('.portal');

function createModalToNewNewsletterSubscriber() {
  const {
    isSubmitting,
    fields: { email },
  } = NewsletterStore.getState();

  if (!isSubmitting) return;

  const $message = createElement(
    'fragment',
    null,
    'O e-mail ',
    createElement('strong', { className: 'modal__email' }, email),
    createElement('br'),
    'foi cadastrado com sucesso!'
  );

  const $modal = Modal({
    title: 'Muito obrigado!',
    message: $message,
    onConfirm: function () {
      $portal.classList.remove('show-modal');
      $modal.remove();
    },
  });

  $portal.appendChild($modal);
  $portal.classList.add('show-modal');
}

export function addModalEvents() {
  NewsletterStore.subscribe(createModalToNewNewsletterSubscriber);
}
