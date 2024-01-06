import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Modal from './Modal/Modal';
import Button from './Button/Button';

class App extends Component {
  state = {
    images: [], // Tu będzie przechowywana tablica obrazków pobranych z API
    query: '', // Tutaj będzie przechowywane aktualne zapytanie do API
    largeImageUrl: '', // Tutaj będzie przechowywany adres URL dużego obrazka do modala
    alt: '', // Tutaj będzie przechowywany alternatywny tekst obrazka do modala
    page: 1, // Numer strony wyników wyszukiwania (dla paginacji)
    isLoading: false, // Flaga wskazująca, czy trwa ładowanie kolejnych obrazków
    showModal: false, // Flaga wskazująca, czy modal powinien być widoczny
  };

  handleSubmit = (query) => {
    this.setState({ query, images: [], page: 1 }, this.fetchImages);
  };

  fetchImages = () => {
    const { query, page } = this.state;
    const API_KEY = '38858109-c828e4419821e6c1b097414a2';

    this.setState({ isLoading: true });

    fetch(
      `https://pixabay.com/api/?q=${query}&page=${query}&key=38858109-c828e4419821e6c1b097414a2&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState((prevState) => ({
          images: [...prevState.images, ...data.hits],
          page: prevState.page + 1,
        }));
      })
      .catch((error) => console.error('Error fetching images:', error))
      .finally(() => this.setState({ isLoading: false }));
  };

  openModal = (largeImageUrl, alt) => {
    this.setState({ largeImageUrl, alt, showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { images, isLoading, showModal, largeImageUrl, alt } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery>
          {images.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              imageUrl={webformatURL}
              alt={tags}
              onClick={() => this.openModal(largeImageURL, tags)}
            />
          ))}
        </ImageGallery>
        {isLoading && <h2>Loading...</h2>}
        {images.length > 0 && !isLoading && (
          <Button onClick={this.fetchImages} />
        )}
        {showModal && (
          <Modal
            largeImageUrl={largeImageUrl}
            alt={alt}
            onClose={this.closeModal}
          />
        )}
      </div>
    );
  }
}

export default App;

