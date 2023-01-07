import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { useRef, useState } from 'react';
import SearchFilters from './SearchFilters';
import { useQuery } from '@tanstack/react-query';
import fetchSearchSuggestions from '../../lib/fetch/fetchSearchSuggestions';

type ReactFormOrMouseEvent =
  | React.FormEvent<HTMLFormElement>
  | React.MouseEvent<HTMLAnchorElement, MouseEvent>;

type SearchBarProps = {
  initialSearchQuery?: string;
  includeFilterOptions?: Boolean;
  searchType?: string;
};

const MAX_SUGGESTIONS = 5;

export default function SearchBar({
  initialSearchQuery,
  includeFilterOptions = true,
  searchType,
}: SearchBarProps) {
  const searchText = useRef<HTMLInputElement>(null);
  const suggestionsList = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();
  const [suggestionsQuery, setSuggestionsQuery] = useState('');
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  function onSubmit(e: ReactFormOrMouseEvent, videoType?: string) {
    e.preventDefault();
    if (!searchText.current?.value || searchText.current.value?.length === 0) {
      searchText.current && searchText.current.focus();
      return;
    }
    performSearch(searchText.current.value, videoType);
  }

  function performSearch(searchText: string, videoType?: string) {
    navigate({
      pathname: '/search',
      search: createSearchParams(
        Object.assign(
          {
            title: searchText,
          },
          videoType && { type: videoType }
        )
      ).toString(),
    });
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!suggestions.data) {
      return;
    }
    if (e.key === 'ArrowUp') {
      if (activeSuggestionIndex < 1) {
        return;
      }
      setActiveSuggestionIndex((suggestionIndex) => suggestionIndex - 1);
    } else if (e.key === 'ArrowDown') {
      if (
        activeSuggestionIndex ===
        Math.min(suggestions.data.Search.length, MAX_SUGGESTIONS) - 1
      ) {
        return;
      }
      setActiveSuggestionIndex((suggestionIndex) => suggestionIndex + 1);
    } else if (e.key === 'Enter') {
      navigate(
        `../movie/${suggestions.data.Search[activeSuggestionIndex].imdbID}`
      );
    }
  }

  let throttleId: NodeJS.Timeout;
  function throttle(text: string) {
    if (throttleId) {
      clearTimeout(throttleId);
    }
    throttleId = setTimeout(() => {
      setActiveSuggestionIndex(-1);
      setSuggestionsQuery(text);
    }, 300);
  }

  const suggestions = useQuery(
    ['search-suggestions', suggestionsQuery],
    fetchSearchSuggestions
  );

  return (
    <div className="md:w-96">
      <form onSubmit={onSubmit} autoComplete="off" className="relative">
        <div className="flex flex-row items-stretch w-full">
          <input
            type="search"
            className="form-control flex-auto min-w-0 w-full px-3 py-1.5 text-base font-alternative text-gray-500 bg-gray-50 bg-clip-padding border border-solid border-gray-300 rounded-l-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-bistre focus:outline-none"
            placeholder="Search for movies"
            aria-label="Search for movies"
            name="movies"
            ref={searchText}
            defaultValue={initialSearchQuery}
            onChange={(e) => throttle(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {suggestions.data?.Response == 'True' && (
            <div className="bg-baby-powder border border-solid w-full h-34 absolute top-12 z-10 rounded shadow-lg">
              <ul
                className="leading-7 text-base font-alternative"
                ref={suggestionsList}
              >
                {suggestions.data.Search.slice(0, MAX_SUGGESTIONS).map(
                  (suggestion, index) => (
                    <Link
                      to={`../movie/${suggestion.imdbID}`}
                      onFocus={() => setActiveSuggestionIndex(index)}
                    >
                      <li
                        onMouseEnter={() => setActiveSuggestionIndex(index)}
                        className={`px-3 ${
                          index === activeSuggestionIndex &&
                          `bg-middle-gray text-baby-powder text-bold`
                        } `}
                      >
                        {suggestion.Title}
                      </li>
                    </Link>
                  )
                )}
              </ul>
            </div>
          )}
          <button
            className="btn inline-block px-6 py-2.5 bg-black text-baby-powder font-medium text-xs leading-tight uppercase rounded-r-lg shadow-md hover:bg-bistre border-black border-solid border-2 hover:border-sizzling-red focus:border-sizzling-red hover:shadow-lg focus:bg-bistre focus:shadow-lg focus:outline-none focus:ring-0 active:bistre active:shadow-lg transition duration-150 ease-in-out items-center"
            type="submit"
          >
            <BsSearch className="text-xl font-extrabold" aria-hidden="true" />
            <span className="sr-only">Search</span>
            {/* Show text instead of icon for screen readers */}
          </button>
        </div>

        <>
          {includeFilterOptions && (
            <SearchFilters searchType={searchType} onFilterClick={onSubmit} />
          )}
        </>
      </form>
    </div>
  );
}
