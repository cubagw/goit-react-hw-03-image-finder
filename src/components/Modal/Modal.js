import React, { Component, createRef } from 'react';
// import { createPortal } from 'react-dom';
import T from 'prop-types';

import styles from './Modal.module.css';

// const MODAL_ROOT = document.querySelector('#modal-root');

class Modal extends Component {
  static propTypes = {
    onCloseModal: T.func.isRequired,
    url: T.string.isRequired,
  };

  backdropRef = createRef();

  componentDidMount() {
    window.addEventListener('keydown', this.clicClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.clicClose);
  }

  clicClose = e => {
    if (e.code !== 'Escape') return;

    this.props.onCloseModal();
  };

  handleBackdropClick = e => {
    if (this.backdropRef.current && e.target !== this.backdropRef.current) {
      return;
    }

    this.props.onCloseModal();
  };

  render() {
    const { url } = this.props;

    return (
      <div
        className={styles.overlay}
        ref={this.backdropRef}
        onClick={this.handleBackdropClick}
        role="presentation"
      >
        <div className={styles.modal}>
          <img src={url} alt="" />
        </div>
      </div>
      // MODAL_ROOT
    );
  }
}

export default Modal;
