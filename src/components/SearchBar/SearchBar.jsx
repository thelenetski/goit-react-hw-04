import css from './SearchBar.module.css';
import { FaSearch } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

const SearchBar = ({ onSubmit, data }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    if (
      form.elements.search.value.trim() === '' ||
      /^\s*$/.test(form.elements.search.value.trim())
    ) {
      return toast.error('Empty request, please write some text.');
    }
    onSubmit(form.elements.search.value.trim());
    form.reset();
  };

  return (
    <header className={css.search}>
      <div>
        <Toaster position="top-right" reverseOrder={true} />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit">
          <FaSearch />
        </button>
      </form>
      {data.total_pages > 0 && (
        <div className={css.info}>
          <p>{`Images: ${data.total}`}</p>
          <p>{`Pages: ${data.total_pages}`}</p>
        </div>
      )}
    </header>
  );
};

export default SearchBar;
