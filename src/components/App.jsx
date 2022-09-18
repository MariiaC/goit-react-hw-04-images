import { useState, useEffect } from 'react';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Searchbar } from './Searchbar';
import { Modal } from './Modal';
import { Loader } from './Loader';
import s from './App.module.css';
import * as PixabayApi from './Services/PixabayApi';
//import { ImageGalleryItem } from './ImageGallery';
//import { fetchImagesViaQuery } from './Services';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export const App = () => {
  const [status, setStatus] = useState(Status.IDLE);
  const [showModal, setShowModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [bigPicture, setBigPicture] = useState(null);
  const [picturesName, setPicturesName] = useState('');
  const [error, setError] = useState(null);
  const [showButton, setShowButton] = useState(true);
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);

  const changePage = () => {
    setPage(page + 1);
  };

  const clearPage = () => {
    setPage(1);
  };

  const toggleModal = picture => {
    setShowModal(!showModal);
    setBigPicture(picture);
  };

  useEffect(() => {
    if (!picturesName) {
      return;
    }
    if (page !== 1) {
      return;
    } else {
      const fetchFirstPage = async searchQuery => {
        setStatus(Status.PENDING);
        setShowButton(true);
        setPictures([]);
        if (page === 1) {
          try {
            const fetchPicture = await PixabayApi.fetchImagesViaQuery(
              searchQuery,
              page
            );
            if (fetchPicture.data.total === 0) {
              alert(
                'Images not found. Please try again.'
              );
              setShowButton(false);
              setStatus(Status.IDLE);
              return;
            }
            if (fetchPicture.data.hits.length < 12) {
              alert('End of list');
              setPictures(prevPictures => [
                ...prevPictures,
                ...fetchPicture.data.hits,
              ]);
              setStatus(Status.RESOLVED);
              setShowLoader(false);
              setShowButton(false);
              return;
            }
            setPictures(fetchPicture.data.hits);
            setStatus(Status.RESOLVED);
          } catch (error) {
            setError(error);
            setStatus(Status.REJECTED);
          }
        }
      };
      fetchFirstPage(picturesName);
    }
  }, [page, picturesName]);

  useEffect(() => {
    if (page > 1) {
      const fetchNextPage = async searchQuery => {
        setShowLoader(true);
        setShowButton(false);

        try {
          const fetchPicture = await PixabayApi.fetchImagesViaQuery(
            searchQuery,
            page
          );
          if (fetchPicture.data.hits.length < 12) {
            alert(`End of list`);
            setPictures(prevPictures => [
              ...prevPictures,
              ...fetchPicture.data.hits,
            ]);
            setStatus(Status.RESOLVED);
            setShowLoader(false);
            setShowButton(false);
          } else {
            setPictures(prevPictures => [
              ...prevPictures,
              ...fetchPicture.data.hits,
            ]);
            setStatus(Status.RESOLVED);
            setShowLoader(false);
            setShowButton(true);
          }
        } catch (error) {
          setError(error);
          setStatus(Status.REJECTED);
        }
      };
      fetchNextPage(picturesName);
    }
  }, [page, picturesName]);

   return (
       <div className={s.app}>
       <Searchbar onSubmit={setPicturesName} clearPage={clearPage} />
       <>
         {status === 'idle' && <h1>What are we searching for?</h1>}
        {status === 'rejected' && (<h1> Something went wrong: {error.message}</h1>
        )}
         {status === 'resolved' && (
           <div>
             <ImageGallery pictures={pictures} toggleModal={toggleModal} />
             {showButton && <Button changePage={changePage} />}
             {showModal && (
               <Modal toggleModal={toggleModal} bigPicture={bigPicture} />
             )}
           </div>
         )}
             {(status === 'pending' || showLoader) && <Loader />}
       </>
   </div>
    )
};



