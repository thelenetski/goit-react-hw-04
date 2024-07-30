import css from './Loader.module.css';
import PropagateLoader from 'react-spinners/PropagateLoader';

const Loader = ({ loading }) => {
  return (
    <>
      <PropagateLoader
        className={css.loaderWrap}
        color="#6da5d3"
        loading={loading}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </>
  );
};

export default Loader;
