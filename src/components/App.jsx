import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import Api from './Api/Api';

class App extends Component {
  state = {
    images: [], // Tu będzie przechowywana tablica obrazków pobranych z API
    query: '', // Tutaj będzie przechowywane aktualne zapytanie do API
    largeImageUrl: '', // Tutaj będzie przechowywany adres URL dużego obrazka do modala
    alt: '', // Tutaj będzie przechowywany alternatywny tekst obrazka do modala
    page: 1, // Numer strony wyników wyszukiwania (dla paginacji)
    showModal: false, // Flaga wskazująca, czy modal powinien być widoczny
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, query } = this.state;

    if (prevState.page !== page || prevState.query !== query) {
      this.fetchImages();
    }
  }

 fetchImages = async () => { 
    const { page, query } = this.state;
 

 try {
    const newImages = await Api.fetchImages(query, page);
    this.setState((prevState) => ({
      images: [...prevState.images, ...newImages],
    }));
  } catch (error) {
    console.error('Error', error);
  } finally {
    this.setState({ isLoading: false });
  } 
}; 

  handleSubmit = (query) => {
    this.setState({ query, page: 1, images: [] });
  } 
  

  handleLoadMore = async () => {
    this.setState(ps => ({ isLoading: true, page: ps.page + 1 }));
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
          <Button onClick={this.handleLoadMore} />
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
        }}

export default App;

