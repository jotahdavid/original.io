import NewsletterStore from '../store/NewsletterStore.js';
import isEmailValid from '../utils/isEmailValid.js';

/**
 * @param {HTMLFormElement} form
 * @returns {Record<string, string>}
 */
function getFormData(form) {
  const formData = Object.fromEntries(new FormData(form));
  const parsedData = Object.entries(formData).reduce(
    (acc, [name, value]) => ({
      ...acc,
      [name]: value.trim(),
    }),
    {}
  );
  return parsedData;
}

NewsletterStore.subscribe(() => {
  NewsletterStore.getState().errors.forEach((error) => console.error(error.message));
});

function handleNewsletterFormSubmit(event) {
  event.preventDefault();

  NewsletterStore.dispatch({ type: 'CLEAR_ERRORS' });

  const $form = event.currentTarget;
  const { name, email } = getFormData($form);

  const errors = [];

  if (name === '') {
    errors.push({ field: 'name', message: 'Nome é obrigatório!' });
  }

  if (email === '') {
    errors.push({ field: 'email', message: 'E-mail é obrigatório!' });
  } else if (!isEmailValid(email)) {
    errors.push({ field: 'email', message: 'O formato do e-mail é inválido!' });
  }

  if (errors.length >= 1) {
    NewsletterStore.dispatch({ type: 'ADD_ERRORS', payload: { errors } });
    return;
  }

  alert('Você foi cadastrado com sucesso na Newsletter!');
}

export function addNewsletterEvents() {
  const $newsletterForm = document.querySelector('.newsletter-signup');
  $newsletterForm.addEventListener('submit', handleNewsletterFormSubmit);
}
