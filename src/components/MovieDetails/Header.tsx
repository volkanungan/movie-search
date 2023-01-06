type HeaderProps = {
  title: string;
  year: string;
  rated: string;
  runtime: string;
  genres: string;
};

export default function Header({
  title,
  year,
  rated,
  runtime,
  genres,
}: HeaderProps) {
  return (
    <>
      <h2 className="font-header sm:text-end font-extrabold text-2xl mt-4 drop-shadow-md">
        {title}
      </h2>
      <p className="sm:text-end text-sl drop-shadow-md text-slate">
        {year} ∙ Rated {rated} ∙ {runtime}
      </p>
      <div className="sm:text-end mt-3 ">
        {genres.split(',').map((genre) => (
          <span
            className="bg-gray-100 py-2 px-3 rounded-2xl text-bistre font-semibold text-xs tracking-wider mx-1 shadow-md"
            key={genre}
          >
            {genre}
          </span>
        ))}
      </div>
    </>
  );
}
