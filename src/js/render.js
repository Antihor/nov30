function templateCard(hit) {
  const {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = hit;
  return `<a href="${largeImageURL}" class='card'
      ><li class='item'>
        <img src="${webformatURL}" alt="${tags}" class='image' />
        <p><b>Views: </b>${views}</p>
        <p><b>Likes: </b>${likes}</p>
        <p><b>Comments: </b>${comments}</p>
        <p><b>Downloads: </b>${downloads}</p>
      </li>
    </a>`;
}

export function showCards(hits) {
  return hits.map(templateCard).join('');
}
