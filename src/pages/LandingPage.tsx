import { FaFilm } from 'react-icons/fa';
import SearchBar from '../components/SearchBar/SearchBar';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center gap-5 m-[3%] justify-center">
      <FaFilm
        className="text-8xl text-sizzling-red drop-shadow-xl"
        aria-hidden="true"
      />
      <SearchBar includeFilterOptions={false} />
    </div>
  );
}