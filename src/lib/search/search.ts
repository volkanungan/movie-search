import { createSearchParams, NavigateFunction } from 'react-router-dom';
import { SuggestionsAction } from '../reducer/searchSuggestions';

function performSearch(
  navigate: NavigateFunction,
  searchText: string,
  videoType?: string
) {
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

let throttleId: NodeJS.Timeout;
function throttle(text: string, dispatch: React.Dispatch<SuggestionsAction>) {
  if (throttleId) {
    clearTimeout(throttleId);
  }
  throttleId = setTimeout(() => {
    dispatch({ type: 'stopped_typing', payload: text });
  }, 300);
}

export { performSearch, throttle };
