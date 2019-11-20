import React, { Component } from 'react';
import { BulletList } from 'react-content-loader';

import Gallery from '../Gallery/Gallery';
import Modal from '../Modal/Modal';
import SearchForm from '../SearchForm/SearchForm';
import * as fetchApi from '../../services/fetchApi';
import styles from './App-module.css';

const MyBulletListLoader = () => <BulletList />;

class App extends Component {
  state = {
    photos: [],
    isLoading: false,
    error: null,
    pageNumber: 1,
    isModalOpen: false,
    query: '',
    targetPhoto: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, pageNumber } = this.state;
    if (prevState.query !== query) {
      this.fetchItems();
    }
    console.log(prevState.pageNumber, 'prevState.pageNumber');
    console.log(pageNumber, 'pageNumber');

    if (prevState.pageNumber !== pageNumber) {
      window.scrollTo({
        top: pageNumber * 1000,
        behavior: 'smooth',
      });
    }
  }

  onSearch = query => {
    this.setState({
      query,
      photos: [],
      pageNumber: 1,
    });
  };

  fetchItems = () => {
    this.setState({ isLoading: true });
    fetchApi
      .fetchArticles(this.state.query, this.state.pageNumber)
      .then(items => {
        this.setState(state => ({
          photos: [...state.photos, ...items],
          pageNumber: state.pageNumber + 1,
        }));
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

  openModal = id => {
    this.setState({ isModalOpen: true, targetPhoto: id });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false, targetPhoto: '' });
  };

  render() {
    const { photos, isLoading, error, isModalOpen, targetPhoto } = this.state;
    const currentPhoto = photos.filter(photo => photo.id === targetPhoto);

    return (
      <div className={styles.app}>
        {<SearchForm onSubmit={this.onSearch} />}
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && <BulletList />}
        {photos.length > 0 && (
          <Gallery photos={photos} onOpenModal={this.openModal} />
        )}
        {isModalOpen && (
          <Modal
            onCloseModal={this.closeModal}
            url={currentPhoto[0].largeImageURL}
          />
        )}
        {photos.length > 0 && (
          <button
            type="button"
            onClick={this.fetchItems}
            className={styles.button}
          >
            Load more
          </button>
        )}
      </div>
    );
  }
}
export default App;
