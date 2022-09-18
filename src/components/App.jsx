import React, { Component } from 'react';
import { ImageGallery } from './ImageGallery';
//import { ImageGalleryItem } from './ImageGallery';
//import { fetchImagesViaQuery } from './Services';
import { Button } from './Button';
import { Searchbar } from './Searchbar';
import { Modal } from './Modal';
 import { Loader } from './Loader';

import s from './App.module.css';
import * as PixabayApi from './Services/PixabayApi'

export class App extends Component{
  state = {
    images: [],
    searchQuery: '',
    page: 1,
    loading: false,
    largeImageURL: '',
    
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;

    if (prevQuery !== nextQuery) {
      this.fetchImages();
    }
  };


  fetchImages = () => {
    const { searchQuery, page } = this.state;
    this.setState({ loading: true })
    PixabayApi
      .fetchImagesViaQuery(searchQuery, page)
      .then(images => this.setState(prevState => ({
        images: [...prevState.images, ...images],
        page: prevState.page + 1,
      })))
      .then(this.scroll)
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  };

  handleBarSubmit = query => {
    this.setState({
      searchQuery: query,
      page: 1,
      images: [],
      showModal: false,
    })
  };

  scroll = () => {
    return window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  toggleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };

  openModal = (largeImageURL) => {
    this.setState({ showModal: true, largeImageURL: largeImageURL })
  };

  render() {
    const { images, loading, showModal, largeImageURL } = this.state;
    return (
       <div className={s.app}>
        <Searchbar onSubmit={this.handleBarSubmit} />
        <ImageGallery images={images} onImageClick={this.openModal} />
       {loading && <Loader />}
      
        {images.length !==0 && !loading && <Button onButtonClick={this.fetchImages}/>}
        {showModal && <Modal onClose={this.toggleModal} largeImageURL={largeImageURL}/>}
      </div>
    )
  };
}
