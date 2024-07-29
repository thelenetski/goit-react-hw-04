import css from './SearchBar.module.css';
import { FaSearch } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    if (form.elements.search.value === '') {
      return toast.error('Empty request, please write some text.');
    }
    onSubmit(form.elements.search.value);
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
    </header>
  );
};

export default SearchBar;
