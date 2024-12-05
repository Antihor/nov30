import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImages } from './js/api';
import { showCards } from './js/render';

const refs = {
  form: document.querySelector('.js-form'),
  gallery: document.querySelector('.js-gallery'),
  more: document.querySelector('.more'),
  loader: document.querySelector('.loader'),
};
let query;
let page;
let lastPage;

refs.form.addEventListener('submit', onSubmit);
refs.more.addEventListener('click', onMore);

async function onSubmit(ev) {
  ev.preventDefault();
  page = 1;
  showLoader();
  try {
    query = ev.target.elements.query.value.trim();
    if (!query) {
      showError('No query!');
      return;
    }
    const data = await getImages(query, page);
    if (data.total === 0) {
      showError('No images matching your query found.');
    }
    lastPage = Math.ceil(data.total / 15);

    refs.gallery.innerHTML = '';
    renderCards(data.hits);
  } catch (err) {
    showError(err);
  }

  hideLoader();
  checkMore();
  ev.target.reset();
}

async function onMore() {
  page += 1;
  showLoader();

  const data = await getImages(query, page);

  renderCards(data.hits);
  hideLoader();
  checkMore();

  const height = refs.gallery.getBoundingClientRect().height;

  scrollBy({
    behavior: 'smooth',
    top: height * 2,
  });
}

function renderCards(hits) {
  const markup = showCards(hits);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function showMore() {
  refs.more.classList.remove('hidden');
}

function hideMore() {
  refs.more.classList.add('hidden');
}

function checkMore() {
  if (page >= lastPage) {
    hideMore();
  } else {
    showMore();
  }
}
function showLoader() {
  refs.loader.classList.remove('hidden');
}

function hideLoader() {
  refs.loader.classList.add('hidden');
}
function showError(msg) {
  iziToast.error({
    title: 'Error!',
    message: msg,
    position: 'center',
  });
}
