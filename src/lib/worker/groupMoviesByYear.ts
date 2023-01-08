import { Movie } from '../types/APIResponsesTypes';
const cache = new Map();

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
  if (cache.has(JSON.stringify(movies))) {
    postMessage(cache.get(JSON.stringify(movies)));
    return;
  }

  // Sort the arrays first based on their year so same-year movies will be adjacent to each other
  const sortedMovies = sortMoviesByYear(movies);
  // Then group them and return as MoviesByYear[]
  const groupedMovies = groupMoviesByYear(sortedMovies);

  cache.set(JSON.stringify(movies), groupedMovies);
  postMessage(groupedMovies);
}

function timeOfProduction(year: string) {
  let isRange, startingYear, endingYear;
  if (year.includes('–')) {
    isRange = true;
    [startingYear, endingYear = new Date().getFullYear()] = year.split('–');
    endingYear = endingYear === '' ? new Date().getFullYear() : endingYear;
  } else {
    isRange = false;
    startingYear = endingYear = year;
  }
  return {
    isRange,
    startingYear: Number(startingYear),
    endingYear: Number(endingYear),
  };
}

function sortMoviesByYear(movies: Movie[]) {
  return [...movies].sort((a, b) => {
    const years = {
      a: timeOfProduction(a.Year),
      b: timeOfProduction(b.Year),
    };
    if (years.b.endingYear > years.a.endingYear) {
      return 1;
    }
    if (years.b.endingYear < years.a.endingYear) {
      return -1;
    }
    if (!years.a.isRange && !years.b.isRange) {
      return 0;
    }
    if (years.a.isRange && !years.b.isRange) {
      return 1;
    }
    if (!years.a.isRange && years.b.isRange) {
      return -1;
    }
    return years.a.startingYear > years.b.startingYear ? -1 : 1;
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
  timeOfProduction,
  sortMoviesByYear,
};
