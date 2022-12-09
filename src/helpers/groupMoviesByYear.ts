import { Movie } from './APIResponsesTypes';

interface MoviesByYear {
  year: string;
  movies: Movie[];
}

addEventListener('message', (message) => {
  if (message.data.command === 'group') {
    groupAndPost(message.data.movies);
  }
});

// Even though this function takes two turns (first sort, and then reduce), the complexity
// is still O(n logn) since sort is O(n logn) and reduce is O(n)
function groupAndPost(movies: Movie[]) {
  // Sort the arrays first based on their year so same-year movies will be adjacent to each other
  const sortedMovies = sortMoviesByYear(movies);

  // Then group them and return as MoviesByYear[]
  const groupedMovies = groupMoviesByYear(sortedMovies);

  postMessage(groupedMovies);
}

// "1996" -> 1996
// "1996–2012" -> 2012
// "1996–" -> Current year since this is still ongoing
function getLastYear(string: string) {
  const trimmedYear = string.includes('–') ? string.split('–')[1] : string;
  return Number(trimmedYear === '' ? new Date().getFullYear() : trimmedYear);
}

function sortMoviesByYear(movies: Movie[]) {
  return [...movies].sort((a, b) => {
    if (getLastYear(b.Year) > getLastYear(a.Year)) {
      return 1;
    }
    return -1;
  });
}

function groupMoviesByYear(sortedMovies: Movie[]) {
  return sortedMovies.reduce((acc, current) => {
    if (acc.length > 0 && acc[acc.length - 1].year === current.Year) {
      acc[acc.length - 1].movies.push(current);
    } else {
      acc.push({
        year: current.Year,
        movies: [current],
      });
    }
    return acc;
  }, [] as MoviesByYear[]);
}

export const exportedForTesting = {
  groupMoviesByYear,
  getLastYear,
  sortMoviesByYear,
};
