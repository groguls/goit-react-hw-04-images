import { Modal } from 'components/Modal/Modal';
import { GalleryItem, Image } from './ImageGalleryItem.styled';
import { useState } from 'react';

export const ImageGalleryItem = ({ image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalToggle = evt => {
    if (evt.target === evt.currentTarget || evt.code === 'Escape') {
      setIsModalOpen(!isModalOpen);
    }
  };

  const { webformatURL, tags, largeImageURL } = image;

  return (
    <GalleryItem>
      <Image src={webformatURL} alt={tags} onClick={modalToggle} />
      {isModalOpen && (
        <Modal onClose={modalToggle}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </GalleryItem>
  );
};
