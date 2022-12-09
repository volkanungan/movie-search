import { createSearchParams, useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';

export default function SearchBar() {
  const navigate = useNavigate();
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const textSearch = formData.get('movies')?.toString();
    if (!textSearch || textSearch?.length === 0) {
      return;
    }

    navigate({
      pathname: '/search',
      search: createSearchParams({
        title: textSearch,
      }).toString(),
    });
  }
  return (
    <div className="md:w-96">
      <form className="flex flex-row items-stretch w-full" onSubmit={onSubmit}>
        <input
          type="search"
          className="form-control flex-auto min-w-0 w-full px-3 py-1.5 text-base font-alternative text-gray-500 bg-gray-50 bg-clip-padding border border-solid border-gray-300 rounded-l-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-bistre focus:outline-none"
          placeholder="Search for movies"
          aria-label="Search for movies"
          name="movies"
        />
        <button
          className="btn inline-block px-6 py-2.5 bg-black text-baby-powder font-medium text-xs leading-tight uppercase rounded-r-lg shadow-md hover:bg-bistre border-black border-solid border-2 hover:border-sizzling-red focus:border-sizzling-red hover:shadow-lg focus:bg-bistre focus:shadow-lg focus:outline-none focus:ring-0 active:bistre active:shadow-lg transition duration-150 ease-in-out items-center"
          type="submit"
        >
          <BsSearch className="text-xl font-extrabold" aria-hidden="true" />
          <span className="sr-only">Search</span>
          {/* Show text instead of icon for screen readers */}
        </button>
      </form>
    </div>
  );
}
