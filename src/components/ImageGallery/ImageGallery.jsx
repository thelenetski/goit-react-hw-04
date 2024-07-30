import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

const ImageGallery = ({ data, onModal, lastImageRef }) => {
  return (
    <div className={css.imgGallery}>
      {data && (
        <ul>
          {data.map((item, index) => {
            return (
              <li key={item.id}>
                <ImageCard
                  ref={index === data.length - 1 ? lastImageRef : null}
                  imgData={item}
                  onModal={onModal}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ImageGallery;
