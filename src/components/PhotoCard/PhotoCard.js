import React from 'react';
import T from 'prop-types';

import styles from './PhotoCard.module.css';

const PhotoCard = ({
  item: { webformatURL, likes, views, comments, downloads },
}) => {
  return (
    <li>
      <div className={styles.photo_card}>
        <img src={webformatURL} alt="#" />

        <div className={styles.stats}>
          <p className={styles.stats_item}>
            <i className="material-icons">thumb_up</i>
            {likes}
          </p>
          <p className={styles.stats_item}>
            <i className="material-icons">visibility</i>
            {views}
          </p>
          <p className={styles.stats_item}>
            <i className="material-icons">comment</i>
            {comments}
          </p>
          <p className={styles.stats_item}>
            <i className="material-icons">cloud_download</i>
            {downloads}
          </p>
        </div>

        {/* <!-- Кнопка для открытия модалки с большим изображением, появляется при наведении --> */}
        <button type="button" className={styles.fullscreen_button}>
          <i className="material-icons">zoom_out_map</i>
        </button>
      </div>
    </li>
  );
};

PhotoCard.propTypes = {
  item: T.shape({
    id: T.number.isRequired,
    webformatURL: T.string.isRequired,
    likes: T.number.isRequired,
    views: T.number.isRequired,
    comments: T.number.isRequired,
    downloads: T.number.isRequired,
  }).isRequired,
};

export default PhotoCard;
