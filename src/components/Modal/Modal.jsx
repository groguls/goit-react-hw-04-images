import { useEffect } from 'react';
import { Overlay, StyledModal } from './Modal.styled';

export const Modal = ({ onClose, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', onClose);
    return () => {
      window.removeEventListener('keydown', onClose);
    };
  }, [onClose]);

  return (
    <Overlay onClick={onClose}>
      <StyledModal>{children}</StyledModal>
    </Overlay>
  );
};
