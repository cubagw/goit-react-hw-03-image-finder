export const fetchArticles = query => {
  return fetch(
    `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${query}&page=1&per_page=12&key=14238926-6521d7a6bddf65796939e13e0`,
  )
    .then(res => res.json())
    .then(data => data.hits);
};

// export default fetchArticles;