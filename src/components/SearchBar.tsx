import { createSearchParams, useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { useRef } from 'react';

export default function SearchBar({
  searchQuery,
  includeFilterOptions = true,
}: {
  searchQuery?: string;
  includeFilterOptions?: Boolean;
}) {
  const searchText = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    performRegularSearch();
  }

  function performRegularSearch() {
    if (!searchText.current?.value || searchText.current.value?.length === 0) {
      return;
    }
    navigate({
      pathname: '/search',
      search: createSearchParams({
        title: searchText.current.value,
      }).toString(),
    });
  }

  function onFilterClick(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    type?: string
  ) {
    e.preventDefault();
    if (!type) {
      performRegularSearch();
      return;
    }
    if (!searchText.current?.value || searchText.current.value.length === 0) {
      return;
    }

    navigate({
      pathname: '/search',
      search: createSearchParams({
        title: searchText.current.value,
        type,
      }).toString(),
    });
  }

  return (
    <div className="md:w-96">
      <form onSubmit={onSubmit}>
        <div className="flex flex-row items-stretch w-full">
          <input
            type="search"
            className="form-control flex-auto min-w-0 w-full px-3 py-1.5 text-base font-alternative text-gray-500 bg-gray-50 bg-clip-padding border border-solid border-gray-300 rounded-l-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-bistre focus:outline-none"
            placeholder="Search for movies"
            aria-label="Search for movies"
            name="movies"
            value={searchQuery}
            ref={searchText}
          />
          <button
            className="btn inline-block px-6 py-2.5 bg-black text-baby-powder font-medium text-xs leading-tight uppercase rounded-r-lg shadow-md hover:bg-bistre border-black border-solid border-2 hover:border-sizzling-red focus:border-sizzling-red hover:shadow-lg focus:bg-bistre focus:shadow-lg focus:outline-none focus:ring-0 active:bistre active:shadow-lg transition duration-150 ease-in-out items-center"
            type="submit"
          >
            <BsSearch className="text-xl font-extrabold" aria-hidden="true" />
            <span className="sr-only">Search</span>
            {/* Show text instead of icon for screen readers */}
          </button>
        </div>
        {includeFilterOptions && (
          <ul className="flex flex-row gap-6 text-sm text-slate-gray sm:ml-4 mt-2 font-alternative font-bold tracking-wider">
            <a href="#" onClick={(e) => onFilterClick(e)}>
              <li className="border-b-2 px-1 border-baby-powder hover:border-sizzling-red hover:text-sizzling-red  focus:border-sizzling-red focus:text-sizzling-red">
                All
              </li>
            </a>
            <a href="#" onClick={(e) => onFilterClick(e, 'movies')}>
              <li className="border-b-2 px-1 border-baby-powder hover:border-sizzling-red hover:text-sizzling-red  focus:border-sizzling-red focus:text-sizzling-red">
                Movies
              </li>
            </a>
            <a href="#" onClick={(e) => onFilterClick(e, 'series')}>
              <li className="border-b-2 px-1 border-baby-powder hover:border-sizzling-red hover:text-sizzling-red  focus:border-sizzling-red focus:text-sizzling-red">
                Series
              </li>
            </a>
            <a href="#" onClick={(e) => onFilterClick(e, 'episode')}>
              <li className="border-b-2 px-1 border-baby-powder hover:border-sizzling-red hover:text-sizzling-red  focus:border-sizzling-red focus:text-sizzling-red">
                Episode
              </li>
            </a>
          </ul>
        )}
      </form>
    </div>
  );
}
