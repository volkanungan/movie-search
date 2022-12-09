type MovieItemProps = {
  imdbID: string;
  poster: string;
  title: string;
  type: string;
  year: string;
};

export default function MovieItem({
  imdbID,
  poster,
  title,
  type,
}: MovieItemProps) {
  return (
    <li className="flex flex-row my-5 gap-x-4 items-center">
      <img
        data-testid="thumbnail"
        src={poster === 'N/A' ? 'public/film-solid.svg' : poster}
        alt={`Poster of ${title}`}
        className="w-24 rounded-md border-2 border-solid border-slate-gray shadow-lg"
      />
      <div>
        <h2 className="sm:text-lg font-bold font-alternative tracking-wider">
          {title}
        </h2>
        <p className="text-slate-gray capitalize italic text-sm">{type}</p>
        <a href={`https://www.imdb.com/title/${imdbID}`} target="_blank">
          <img
            src="../../public/imdb.svg"
            className="h-6 my-2"
            aria-hidden="true"
          />
          <span className="sr-only">Imdb</span>
          {/* Show text instead of icon for screen readers */}
        </a>
      </div>
    </li>
  );
}
