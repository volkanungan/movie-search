type SearchFiltersProps = {
  searchType?: string;
  onFilterClick: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    type?: string
  ) => void;
};

export default function SearchFilters({
  searchType,
  onFilterClick,
}: SearchFiltersProps) {
  return (
    <ul className="flex flex-row gap-4 text-sm text-slate-gray sm:ml-4 mt-2 font-alternative font-bold tracking-wider">
      <a
        key={'all'}
        href="#"
        onClick={(e) => onFilterClick(e)}
        className={`capitalize border-b-2 px-3 py-1 border-baby-powder hover:border-sizzling-red hover:text-sizzling-red  focus:border-sizzling-red focus:text-sizzling-red ${
          !searchType
            ? 'text-sizzling-red bg-gray-200 rounded-lg hover:border-baby-powder focus:border-baby-powder'
            : 'border-baby-powder'
        }`}
      >
        <li>All</li>
      </a>
      {['movie', 'series', 'episode'].map((videoType) => (
        <a
          key={videoType}
          href="#"
          onClick={(e) => onFilterClick(e, videoType)}
          className={`capitalize border-b-2 px-3 py-1 border-baby-powder hover:border-sizzling-red hover:text-sizzling-red  focus:border-sizzling-red focus:text-sizzling-red ${
            searchType === videoType
              ? 'text-sizzling-red bg-gray-200 rounded-lg hover:border-baby-powder focus:border-baby-powder'
              : 'border-baby-powder'
          }`}
        >
          <li>{videoType}</li>
        </a>
      ))}
    </ul>
  );
}
