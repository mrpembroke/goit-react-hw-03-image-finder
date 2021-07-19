import React, { Component } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fetchImages from './services/apiService';

class App extends Component {
  state = {
    query: '',
    images: [],
    largeImageURL: '',
    page: 1,
    isLoading: false,
    error: null,
    showModal: false,
    // showButton: false,
  };

  // componentDidMount() {
  //   this.searchImages();
  // }

  componentDidUpdate(_, prevState) {
    if (prevState.query !== this.state.query) {
      this.setState({ images: [], page: 1 });
    }
  }

  searchImages = async () => {
    const { query, page } = this.state;

    if (query.trim() === '') {
      return toast.error('Sry, you are missing the letters');
    }

    this.toggleLoader();

    try {
      const request = await fetchImages(query, page);
      this.setState(({ images, page }) => ({
        images: [...images, ...request],
        page: page + 1,
      }));
      if (request.length === 0) {
        this.setState({ error: `No results were found for ${query}!` });
      }
    } catch (error) {
      this.setState({ error: 'Something went wrong. Try again.' });
    } finally {
      this.toggleLoader();
    }
  };

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.searchImages();
  };

  onLoadMore = () => {
    this.searchImages();
    this.scrollPage();
  };

  toggleLoader = () => {
    this.setState(({ isLoading }) => ({
      isLoading: !isLoading,
    }));
  };

  onOpenModal = e => {
    this.setState({ largeImageURL: e.target.dataset.source });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  scrollPage = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight - 160,
        behavior: 'smooth',
      });
    }, 1000);
  };

  render() {
    const {
      query,
      images,
      isLoading,
      showModal,
      largeImageURL,
      // showButton,
    } = this.state;

    return (
      <div>
        <Searchbar
          value={query}
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
        />

        {/* {error && <ErrorView texterror={error} />} */}
        {images.length > 0 && (
          <ImageGallery images={images} onOpenModal={this.onOpenModal} />
        )}

        {isLoading && <Loader />}
        {!isLoading && images.length > 0 && (
          <Button onLoadMore={this.onLoadMore} />
        )}

        {showModal && (
          <Modal
            onToggleModal={this.toggleModal}
            largeImageURL={largeImageURL}
          />
        )}

        <ToastContainer autoClose={5000} />
      </div>
    );
  }
}

export default App;
