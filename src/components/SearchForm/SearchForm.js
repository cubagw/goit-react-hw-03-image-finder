import React, { Component } from 'react';
import styles from './SearchForm.module.css';

export default class SearchForm extends Component {
  state = { query: '' };

  handleChange = e => {
    this.setState({
      query: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <form className={styles.search_form} onSubmit={this.handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          placeholder="Search images..."
          value={this.state.query}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}
