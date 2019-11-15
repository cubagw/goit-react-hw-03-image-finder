import React, { Component } from 'react';
import { BulletList } from 'react-content-loader';

import Gallery from '../Gallery/Gallery';
import SearchForm from '../SearchForm/SearchForm';
import * as fetchApi from '../../services/fetchApi';
import styles from './App-module.css';

const MyBulletListLoader = () => <BulletList />;

class App extends Component {
  state = {
    photos: [],
    isLoading: false,
    error: null,
    pageNumber: 0,
    query: '',
  };

  componentDidMount() {}

  onSearch = query => {
    this.setState({
      query,
      isLoading: true,
    });
    this.fetchItems();
  };

  fetchItems = () => {
    fetchApi
      .fetchArticles(this.state.query, this.state.pageNumber)
      .then(items => {
        this.setState({
          photos: [...this.state.photos, ...items],
          pageNumber: this.state.pageNumber + 1,
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
        {<SearchForm onSubmit={this.onSearch} />}
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && <BulletList />}
        {photos.length > 0 && <Gallery photos={photos} />}
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
