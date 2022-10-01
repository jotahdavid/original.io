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

function handleNameChange(name) {
  NewsletterStore.dispatch({
    type: 'REMOVE_ERROR',
    payload: { field: 'name' },
  });

  if (name === '') {
    NewsletterStore.dispatch({
      type: 'ADD_ERROR',
      payload: { error: { field: 'name', message: 'Nome é obrigatório!' } },
    });
  }
}

function handleEmailChange(email) {
  NewsletterStore.dispatch({
    type: 'REMOVE_ERROR',
    payload: { field: 'email' },
  });

  if (email === '') {
    NewsletterStore.dispatch({
      type: 'ADD_ERROR',
      payload: { error: { field: 'email', message: 'E-mail é obrigatório!' } },
    });
    return;
  }

  if (!isEmailValid(email)) {
    NewsletterStore.dispatch({
      type: 'ADD_ERROR',
      payload: { error: { field: 'email', message: 'O formato do e-mail é inválido!' } },
    });
  }
}

function handleNewsletterFormSubmit(event) {
  event.preventDefault();

  NewsletterStore.dispatch({ type: 'CLEAR_ERRORS' });

  const $form = event.currentTarget;
  const { name, email } = getFormData($form);

  handleNameChange(name);
  handleEmailChange(email);

  const { errors } = NewsletterStore.getState();
  if (errors.length > 0) return;

  alert('Você foi cadastrado com sucesso na Newsletter!');
}

function handleNewsletterChange(event) {
  const fieldName = event.target.name;

  const $form = event.currentTarget;
  const fieldValue = getFormData($form)[fieldName];

  if (fieldValue === undefined) return;

  if (fieldName === 'name') {
    return handleNameChange(fieldValue);
  }
  if (fieldName === 'email') {
    return handleEmailChange(fieldValue);
  }
}

export function addNewsletterEvents() {
  const $newsletterForm = document.querySelector('.newsletter-signup');
  const $newsletterSubmitBtn = $newsletterForm.querySelector('.newsletter-signup__button');

  $newsletterForm.addEventListener('submit', handleNewsletterFormSubmit);
  $newsletterForm.addEventListener('input', handleNewsletterChange);

  NewsletterStore.subscribe(() => {
    const { fields } = NewsletterStore.getState();

    fields.forEach((field) => {
      const $field = $newsletterForm[field]?.closest('.newsletter-signup__field');
      const $errorsField = $field.querySelector('.newsletter-signup__field-errors');

      $field.classList.remove('error');
      $errorsField.textContent = null;
    });
  });

  NewsletterStore.subscribe(() => {
    const { errors } = NewsletterStore.getState();

    if (errors.length > 0) {
      $newsletterSubmitBtn.disabled = true;
    } else {
      $newsletterSubmitBtn.disabled = false;
    }

    errors.forEach((error) => {
      const $field = $newsletterForm[error.field]?.closest('.newsletter-signup__field');
      const $errorsField = $field.querySelector('.newsletter-signup__field-errors');

      $field.classList.add('error');
      $errorsField.textContent = error.message;
    });
  });
}
