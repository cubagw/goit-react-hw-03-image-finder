export const fetchArticles = (query = '', pageNumber = 1) => {
  return fetch(
    `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${query}&page=${pageNumber}&per_page=12&key=14238926-6521d7a6bddf65796939e13e0`,
  )
    .then(res => res.json())
    .then(data => data.hits);
};
