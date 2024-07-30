import css from './ImageModal.module.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ImageModal = ({ modalIsOpen, closeModal }) => {
  return (
    <>
      <Modal
        isOpen={modalIsOpen.isOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className={css.modal}
        overlayClassName={css.overlay}
      >
        <img src={modalIsOpen.url} alt={modalIsOpen.alt_description} />
        <div className={css.modalWrap}>
          <div className={css.modalDescr}>
            <h2>{modalIsOpen.alt ?? modalIsOpen.alt_description}</h2>
            <p>{`Author: ${modalIsOpen.author}`}</p>
            <p>{`Likes: ${modalIsOpen.likes}`}</p>
          </div>
          <button onClick={closeModal}>Close</button>
        </div>
      </Modal>
    </>
  );
};

export default ImageModal;
