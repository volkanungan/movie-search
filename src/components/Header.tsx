import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { FaFilm } from 'react-icons/fa';

export default function Header({
  initialSearchQuery,
  searchType,
}: {
  initialSearchQuery?: string;
  searchType?: string;
}) {
  return (
    <div className="flex justify-center md:justify-start gap-x-4 md:gap-x-12 mx-5 md:mx-12 items-top mt-8 border-b-2 pb-4">
      <Link to="/">
        <FaFilm className="text-5xl text-sizzling-red drop-shadow-xl" />
      </Link>
      <SearchBar
        initialSearchQuery={initialSearchQuery}
        searchType={searchType}
      />
    </div>
  );
}
