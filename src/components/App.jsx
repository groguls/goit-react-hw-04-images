import { useEffect, useState } from 'react';
import { Gallery, GlobalStyle, PageWrapper } from './GlobalStyle';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { fetchImages } from './pixabayService';
import toast, { Toaster } from 'react-hot-toast';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [randomId, setRandomId] = useState('');

  //HTTP request
  useEffect(() => {
    if (!query) {
      return;
    }
    getImages();

    async function getImages() {
      setLoading(true);
      setIsLoadingMore(false);
      try {
        const { totalHits, hits } = await fetchImages(query, page);
        const isMore = page < Math.ceil(totalHits / 12);

        if (totalHits <= 0) {
          toast(
            'Sorry, there are no images matching your search query. Please try again.',
            {
              icon: '😔',
            }
          );
          return;
        }

        setImages(prevImages => [...prevImages, ...hits]);
        setIsLoadingMore(isMore);

        if (!isMore) {
          toast("We're sorry, but you've reached the end of search results.", {
            icon: '🔎',
          });
        }
      } catch (error) {
        onError();
      } finally {
        setLoading(false);
      }
    }
  }, [page, query, randomId]);

  //autoscroll
  useEffect(() => {
    if (images.length > 12) {
      smoothScrolling();
    }
  }, [images]);

  const onSearch = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
    setRandomId(Date.now());
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onError = () =>
    toast.error('Oops! Something went wrong! Try reloading the page!');

  const smoothScrolling = () => {
    window.scrollBy({
      top: 520,
      behavior: 'smooth',
    });
  };

  return (
    <PageWrapper>
      <Gallery>
        <GlobalStyle />
        <Toaster position="top-right" />
        <Searchbar onSubmit={onSearch} />
        {images.length > 0 && <ImageGallery images={images} />}
      </Gallery>
      {loading && <Loader />}
      {isLoadingMore && <Button onLoadMore={onLoadMore} />}
    </PageWrapper>
  );
};
