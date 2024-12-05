import axios from 'axios';

export async function getImages(query, currentPage) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '42059071-0978dc0d7158b742eee7c30f5';
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true`;

  const params = {
    q: query,
    per_page: 15,
    page: currentPage,
  };

  const resp = await axios.get(url, { params });
  return resp.data;
}
