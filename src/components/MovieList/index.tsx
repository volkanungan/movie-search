import MovieItem from './MovieItem';
import { BiCameraMovie } from 'react-icons/bi';
import { Movie } from '../../lib/types/APIResponsesTypes';

interface MoviesByYear {
  year: string;
  movies: Movie[];
}

export default function MovieList({
  moviesByYear,
}: {
  moviesByYear: MoviesByYear[];
}) {
  return (
    <ol className="mx-5 max-w-7xl xl:mx-auto">
      {moviesByYear.map((movieYear) => (
        <li className="border-b-2 last:border-b-0 my-4" key={movieYear.year}>
          <h2 className="font-bold font-header text-xl text-middle-gray drop-shadow-lg">
            <BiCameraMovie className="inline-block text-2xl pb-1" />{' '}
            {movieYear.year}
          </h2>
          <ul className="ml-7">
            {movieYear.movies.map(({ imdbID, Poster, Title, Type, Year }) => (
              <MovieItem
                key={imdbID}
                imdbID={imdbID}
                poster={Poster}
                title={Title}
                type={Type}
                year={Year}
              />
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
