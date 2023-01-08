import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { MovieSearchAPIResponse } from '../../lib/APIResponsesTypes';
import { SuggestionsAction } from '../../lib/reducer/searchSuggestions';
export const MAX_SUGGESTIONS = 5;

type SearchSuggestionsProps = {
  suggestions: MovieSearchAPIResponse | undefined;
  activeSuggestionIndex: number;
  dispatch: React.Dispatch<SuggestionsAction>;
};

export default function SearchSuggestions({
  suggestions,
  activeSuggestionIndex,
  dispatch,
}: SearchSuggestionsProps) {
  const suggestionsList = useRef<HTMLUListElement>(null);

  if (!suggestions) {
    return null;
  }

  return (
    <div className="bg-baby-powder border border-solid w-full h-34 absolute top-12 z-10 rounded shadow-lg">
      <ul
        className="leading-7 text-base font-alternative"
        ref={suggestionsList}
      >
        {suggestions.Search.slice(0, MAX_SUGGESTIONS).map(
          (suggestion, index) => (
            <Link
              to={`../movie/${suggestion.imdbID}`}
              onFocus={() =>
                dispatch({
                  type: 'tabbed_on_suggestion',
                  payload: index,
                })
              }
            >
              <li
                onMouseEnter={() =>
                  dispatch({
                    type: 'hovered_on_suggestion',
                    payload: index,
                  })
                }
                className={`px-3 text-ellipsis overflow-hidden whitespace-nowrap ${
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
  );
}
