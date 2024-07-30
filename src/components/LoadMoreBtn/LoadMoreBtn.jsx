import css from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onNext }) => {
  return (
    <div className={css.loadBtn}>
      <button type="button" onClick={onNext}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
