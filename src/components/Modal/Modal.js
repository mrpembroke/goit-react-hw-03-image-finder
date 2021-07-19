import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleChange);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleChange);
  }

  handleChange = e => {
    if (e.code === 'Escape' || e.target === e.currentTarget) {
      this.props.onToggleModal();
    }
  };

  // handleKeyDown = e => {
  //   if (e.code === 'Escape') {
  //     this.props.onToggleModal();
  //   }
  // };

  // handleBackdropClick = e => {
  //   if (e.currentTarget === e.target) {
  //     this.props.onToggleModal();
  //   }
  // };

  render() {
    const { largeImageURL } = this.props;

    return createPortal(
      <div className={s.Overlay} onClick={this.handleChange}>
        <div className={s.Modal}>
          <img src={largeImageURL} alt="" />
        </div>
      </div>,
      document.querySelector('#modalPortal'),
    );
  }
}

export default Modal;
