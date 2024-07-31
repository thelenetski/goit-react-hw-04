import { useState, useEffect, useRef } from 'react';
import './App.css';
import axios from 'axios';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import Loader from './components/Loader/Loader';
import ImageModal from './components/ImageModal/ImageModal';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import { AiOutlinePicture } from 'react-icons/ai';

function App() {
  const [search, setSearch] = useState('');
  const [imgData, setImgData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadMoreBtnState, setLoadMoreBtnState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState({
    isOpen: false,
    url: '',
    alt: '',
    descr: '',
    author: '',
    likes: 0,
  });
  const galleryRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState('');
  const PERPAGE = 15;

  const searchParams = new URLSearchParams({
    query: search,
    per_page: PERPAGE,
    page: currentPage,
  });

  useEffect(() => {
    if (search !== '') {
      try {
        const dataRequest = async () => {
          setLoading(true);
          setErrorMsg('');
          const response = await axios.get(
            `https://api.unsplash.com/search/photos?${searchParams}`,
            {
              headers: {
                Authorization: `Client-ID bF_HerDN5h7a7WozJpD-AEWD08N_mhzLLSreF6YpFxA`,
              },
            }
          );
          return response.data;
        };

        dataRequest()
          .then(data => {
            setImgData(prev => {
              return {
                total: data.total,
                total_pages: data.total_pages,
                results: [...(prev.results ?? ''), ...data.results],
              };
            });
            data.total === 0 &&
              setErrorMsg('Nothing was found for your request');
            checkPages(data.total_pages);
            setLoading(false);
          })
          .catch(error => {
            setLoading(false);
            setErrorMsg(error.message);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, [search, currentPage]);

  useEffect(() => {
    if (currentPage > 1) scrollWindow();
  }, [imgData, currentPage]);

  const handleSearch = searchRequest => {
    setCurrentPage(1);
    setLoadMoreBtnState(false);
    setLoading(true);
    setImgData({
      total: imgData.total ?? 0,
      total_pages: imgData.total_pages ?? 0,
      results: [],
    });
    setSearch(searchRequest);
  };

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const checkPages = dataPages => {
    dataPages > 1 && setLoadMoreBtnState(true);
    currentPage >= dataPages && setLoadMoreBtnState(false);
  };

  const handleOpenModal = (imageUrl, imgAlt, imgDescr, imgAuthor, imgLikes) => {
    setIsOpen({
      isOpen: true,
      url: imageUrl,
      alt: imgAlt,
      descr: imgDescr,
      author: imgAuthor,
      likes: imgLikes,
    });
  };

  const handleCloseModal = () => {
    setIsOpen({ isOpen: false });
  };

  const scrollWindow = () => {
    window.scrollBy({
      top: galleryRef.current.height * 3 + 50,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} data={imgData} />
      <div style={{ width: '100%', height: '120px' }}></div>
      {imgData.total < 1 && <AiOutlinePicture className="bgIcon" />}
      {imgData.total > 0 && (
        <ImageGallery
          lastImageRef={galleryRef}
          data={imgData.results}
          onModal={handleOpenModal}
        />
      )}
      {!loading && <ErrorMessage text={errorMsg} />}
      <ImageModal modalIsOpen={modalIsOpen} closeModal={handleCloseModal} />
      <Loader loading={loading} />
      {loadMoreBtnState && <LoadMoreBtn onNext={handleLoadMore} />}
    </>
  );
}

export default App;
