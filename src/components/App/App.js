import React, { Component } from 'react';
import { BulletList } from 'react-content-loader';

import Gallery from '../Gallery/Gallery';
import styles from './App-module.css';

const MyBulletListLoader = () => <BulletList />;

class App extends Component {
  state = {
    photos: [],
    isLoading: false,
    error: null,
  };

  componentDidMount() {
    this.fetchItems();
  }

  fetchItems = () => {
    this.setState({ isLoading: true });
    fetch(
      'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=astound&page=1&per_page=12&key=14238926-6521d7a6bddf65796939e13e0',
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
          photos: data.hits,
        });
      })
      .catch(error => {
        this.setState({
          error,
        });
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  render() {
    const { photos, isLoading, error } = this.state;
    return (
      <div className={styles.app}>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && <BulletList />}
        {photos.length > 0 && <Gallery photos={photos} />}
      </div>
    );
  }
}
export default App;
