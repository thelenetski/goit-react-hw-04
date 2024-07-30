/* eslint-disable react/display-name */
import { forwardRef, useRef, useEffect } from 'react';
import css from './ImageCard.module.css';

const ImageCard = forwardRef(({ imgData, onModal }, ref) => {
  const imgRef = useRef();

  useEffect(() => {
    if (ref) {
      ref.current = imgRef.current;
    }
  }, [ref]);

  return (
    <div className={css.imgCard}>
      <img
        ref={imgRef}
        src={imgData.urls.small}
        alt={imgData.alt_description}
        onClick={() =>
          onModal(
            imgData.urls.regular,
            imgData.alt_description,
            imgData.description,
            imgData.user.name,
            imgData.likes
          )
        }
      />
    </div>
  );
});

export default ImageCard;
