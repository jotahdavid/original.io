import Modal from '../components/Modal.js';
import NewsletterStore from '../store/NewsletterStore.js';
import CartStore from '../store/CartStore.js';
import createElement from '../utils/createElement.js';
import generateID from '../utils/generateID.js';

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
    createElement('strong', { className: 'modal__detach' }, email),
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

function createSucessfulModalToNewPurchase() {
  const { isOrderFinished } = CartStore.getState();

  if (!isOrderFinished) return;

  const $message = createElement(
    'fragment',
    null,
    'O seu pedido ',
    createElement('strong', { className: 'modal__detach' }, `#${generateID()}`),
    ' foi finalizado com sucesso, obrigado pela sua compra!'
  );

  const $modal = Modal({
    title: 'Pedido confirmado',
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
  CartStore.subscribe(createSucessfulModalToNewPurchase);
}
