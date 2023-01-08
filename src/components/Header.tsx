import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { FaFilm } from 'react-icons/fa';

export default function Header({
  initialSearchQuery,
  searchType,
  includeFilterOptions,
}: {
  initialSearchQuery?: string;
  searchType?: string;
  includeFilterOptions?: Boolean;
}) {
  return (
    <div className="flex justify-center md:justify-start gap-x-4 md:gap-x-12 mx-5 max-w-7xl xl:mx-auto items-top mt-8 border-b-2 pb-4 px-12">
      <Link to="/">
        <FaFilm
          className="text-5xl text-sizzling-red drop-shadow-xl"
          aria-label="Landing page"
        />
      </Link>
      <SearchBar
        initialSearchQuery={initialSearchQuery}
        searchType={searchType}
        includeFilterOptions={includeFilterOptions}
      />
    </div>
  );
}
