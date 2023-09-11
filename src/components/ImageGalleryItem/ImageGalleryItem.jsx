import { Modal } from 'components/Modal/Modal';
import { GalleryItem, Image } from './ImageGalleryItem.styled';
import { useState } from 'react';

export const ImageGalleryItem = ({ image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalToggle = () => {
    setIsModalOpen(!isModalOpen);
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
