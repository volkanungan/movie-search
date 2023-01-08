import { Link, useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { useReducer, useRef } from 'react';
import SearchFilters from './SearchFilters';
import { useQuery } from '@tanstack/react-query';
import fetchSearchSuggestions from '../../lib/fetch/fetchSearchSuggestions';
import { performSearch, throttle } from '../../lib/search/search';
import reducer from '../../lib/reducer/searchSuggestions';
import SearchSuggestions from './SearchSuggestions';
import { MAX_SUGGESTIONS } from './SearchSuggestions';

type ReactFormOrMouseEvent =
  | React.FormEvent<HTMLFormElement>
  | React.MouseEvent<HTMLAnchorElement, MouseEvent>;

type SearchBarProps = {
  initialSearchQuery?: string;
  includeFilterOptions?: Boolean;
  searchType?: string;
};

const initialState = {
  suggestionsQuery: '',
  activeSuggestionIndex: -1,
};

export default function SearchBar({
  initialSearchQuery,
  includeFilterOptions = true,
  searchType,
}: SearchBarProps) {
  const searchText = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  function onSubmit(e: ReactFormOrMouseEvent, videoType?: string) {
    e.preventDefault();
    if (!searchText.current?.value || searchText.current.value?.length === 0) {
      searchText.current && searchText.current.focus();
      return;
    }
    performSearch(navigate, searchText.current.value, videoType);
  }

  function onKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    suggestionsCount: number
  ) {
    if (!suggestions.data) {
      return;
    }
    if (e.key === 'ArrowUp') {
      dispatch({ type: 'pressed_key_up' });
    } else if (e.key === 'ArrowDown') {
      dispatch({ type: 'pressed_key_down', payload: { suggestionsCount } });
    } else if (e.key === 'Enter') {
      if (state.activeSuggestionIndex < 0) {
        return;
      }
      navigate(
        `../movie/${
          suggestions.data.Search[state.activeSuggestionIndex].imdbID
        }`
      );
    }
  }

  const suggestions = useQuery(
    ['search-suggestions', state.suggestionsQuery],
    fetchSearchSuggestions
  );

  const suggestionsCount =
    suggestions.data?.Response == 'True'
      ? Math.min(suggestions.data.Search.length, MAX_SUGGESTIONS)
      : 0;

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
            onChange={(e) => throttle(e.target.value, dispatch)}
            onKeyDown={(e) => onKeyDown(e, suggestionsCount)}
          />
          <button
            className="btn inline-block px-6 py-2.5 bg-black text-baby-powder font-medium text-xs leading-tight uppercase rounded-r-lg shadow-md hover:bg-bistre border-black border-solid border-2 hover:border-sizzling-red focus:border-sizzling-red hover:shadow-lg focus:bg-bistre focus:shadow-lg focus:outline-none focus:ring-0 active:bistre active:shadow-lg transition duration-150 ease-in-out items-center"
            type="submit"
          >
            <BsSearch className="text-xl font-extrabold" aria-hidden="true" />
            <span className="sr-only">Search</span>
            {/* Show text instead of icon for screen readers */}
          </button>
          {suggestionsCount > 0 && (
            <SearchSuggestions
              suggestions={suggestions.data}
              activeSuggestionIndex={state.activeSuggestionIndex}
              dispatch={dispatch}
            />
          )}
        </div>

        {includeFilterOptions && (
          <SearchFilters searchType={searchType} onFilterClick={onSubmit} />
        )}
      </form>
    </div>
  );
}
