import React from 'react';
import T from 'prop-types';
import styles from './Gallery.module.css';

import PhotoCard from '../PhotoCard/PhotoCard';

const Gallery = ({ photos }) => {
  const allPhotos = photos.map(item => <PhotoCard key={item.id} item={item} />);

  return <ul className={styles.gallery}>{allPhotos}</ul>;
};

Gallery.propTypes = {
  photos: T.arrayOf(T.shape()).isRequired,
};

export default Gallery;
