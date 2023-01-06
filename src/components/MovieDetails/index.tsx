import { MovieDetailsAPIResponse } from '../../lib/APIResponsesTypes';
import Badges from './Badges';
import Header from './Header';

export default function MovieDetails({
  movie,
}: {
  movie: MovieDetailsAPIResponse;
}) {
  return (
    <>
      <div className="mx-5 mt-5 md:mx-12 max-w-3xl flex justify-between items-center flex-col sm:flex-row sm:items-start">
        <img
          data-testid="thumbnail"
          src={movie.Poster === 'N/A' ? './film-solid.svg' : movie.Poster}
          alt={`Poster of ${movie.Title}`}
          className="sm:w-52 md:w-64 rounded-md border-2 border-solid border-slate-gray shadow-lg"
        />
        <div className="px-5">
          <Header
            title={movie.Title}
            year={movie.Year}
            rated={movie.Rated}
            runtime={movie.Runtime}
            genres={movie.Genre}
          />
          <p className="font-body my-6 mt-8 text-justify border-y-2 border-gray-300 border-dotted py-1">
            {movie.Plot}
          </p>
          <Badges
            director={movie.Director}
            writer={movie.Writer}
            actors={movie.Actors}
            language={movie.Language}
          />
        </div>
      </div>
      <dl className="mx-5 my-8 md:mx-12 max-w-3xl flex justify-center gap-x-4">
        {movie.Ratings.map((rating) => (
          <div
            className="text-center border-x-sizzling-red border-x-2 px-2 rounded-lg"
            key={`${rating.Source}`}
          >
            <dd className="text-2xl text-bistre">{rating.Value}</dd>
            <dt className="text-xs font-alternative tracking-wider">
              {rating.Source}
            </dt>
          </div>
        ))}
      </dl>
    </>
  );
}