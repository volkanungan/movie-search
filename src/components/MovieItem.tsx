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
        src={poster === 'N/A' ? './film-solid.svg' : poster}
        alt={`Poster of ${title}`}
        className="rounded-md border-2 border-solid border-slate-gray shadow-lg"
        width="92"
        height="136"
      />
      <div>
        <h2 className="sm:text-lg font-bold font-alternative tracking-wider">
          {title}
        </h2>
        <p className="text-slate-gray capitalize italic text-sm">{type}</p>
        <a href={`https://www.imdb.com/title/${imdbID}`} target="_blank">
          <img
            src="./imdb.svg"
            className="my-2"
            aria-hidden="true"
            width="47"
            height="26"
          />
          <span className="sr-only">Imdb</span>
          {/* Show text instead of icon for screen readers */}
        </a>
      </div>
    </li>
  );
}
