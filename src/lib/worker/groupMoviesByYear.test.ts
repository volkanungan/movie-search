import { expect, test } from 'vitest';
import { Movie } from '../APIResponsesTypes';
import { exportedForTesting } from './groupMoviesByYear';
const { timeOfProduction, sortMoviesByYear, groupMoviesByYear } =
  exportedForTesting;

test('parses last year if it is a closed range', () => {
  const year = '1996–2012';
  expect(timeOfProduction(year)).toStrictEqual({
    isRange: true,
    startingYear: 1996,
    endingYear: 2012,
  });
});

test('parses current year if it is an open range', () => {
  const year = '1996–';
  const currentYear = new Date().getFullYear();
  expect(timeOfProduction(year)).toStrictEqual({
    isRange: true,
    startingYear: 1996,
    endingYear: currentYear,
  });
});

test('parses first year if it NOT a range', () => {
  const year = '1996';
  expect(timeOfProduction(year)).toStrictEqual({
    isRange: false,
    startingYear: 1996,
    endingYear: 1996,
  });
});

const movies: Movie[] = [
  {
    Title: 'The Matrix',
    Year: '1999',
    imdbID: 'tt0133093',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  },
  {
    Title: 'A Glitch in the Matrix',
    Year: '2021',
    imdbID: 'tt9847360',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMWRhNGY3NGQtMDAxMS00YjY2LTgzOTUtZjljZmUyYWQwMGI2XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg',
  },
  {
    Title: 'The Matrix Reloaded',
    Year: '2003',
    imdbID: 'tt0234215',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BODE0MzZhZTgtYzkwYi00YmI5LThlZWYtOWRmNWE5ODk0NzMxXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  },
  {
    Title: 'The Matrix Resurrections',
    Year: '2021',
    imdbID: 'tt10838180',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMGJkNDJlZWUtOGM1Ny00YjNkLThiM2QtY2ZjMzQxMTIxNWNmXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg',
  },
];

test('sorts movies based on year newest -> oldest', () => {
  const sortedMovies = sortMoviesByYear(movies);
  expect(sortedMovies[0].Year).toBe('2021');
  expect(sortedMovies[1].Year).toBe('2021');
  expect(sortedMovies[2].Year).toBe('2003');
  expect(sortedMovies[3].Year).toBe('1999');
});

test('groups movies based on year', () => {
  const sortedMovies = sortMoviesByYear(movies);
  const groupedMovies = groupMoviesByYear(sortedMovies);
  expect(groupedMovies[0]).toStrictEqual({
    year: '2021',
    movies: [
      {
        Title: 'A Glitch in the Matrix',
        Year: '2021',
        imdbID: 'tt9847360',
        Type: 'movie',
        Poster:
          'https://m.media-amazon.com/images/M/MV5BMWRhNGY3NGQtMDAxMS00YjY2LTgzOTUtZjljZmUyYWQwMGI2XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg',
      },
      {
        Title: 'The Matrix Resurrections',
        Year: '2021',
        imdbID: 'tt10838180',
        Type: 'movie',
        Poster:
          'https://m.media-amazon.com/images/M/MV5BMGJkNDJlZWUtOGM1Ny00YjNkLThiM2QtY2ZjMzQxMTIxNWNmXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg',
      },
    ],
  });
  expect(groupedMovies[1]).toStrictEqual({
    year: '2003',
    movies: [
      {
        Title: 'The Matrix Reloaded',
        Year: '2003',
        imdbID: 'tt0234215',
        Type: 'movie',
        Poster:
          'https://m.media-amazon.com/images/M/MV5BODE0MzZhZTgtYzkwYi00YmI5LThlZWYtOWRmNWE5ODk0NzMxXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
      },
    ],
  });
  expect(groupedMovies[2]).toStrictEqual({
    year: '1999',
    movies: [
      {
        Title: 'The Matrix',
        Year: '1999',
        imdbID: 'tt0133093',
        Type: 'movie',
        Poster:
          'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
      },
    ],
  });
});

const moviesWithRange: Movie[] = [
  {
    Title: 'Blå bog for evigt',
    Year: '2021–',
    imdbID: 'tt15136946',
    Type: 'series',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BZWQxYzlkNWMtNjMwOS00MDZjLWI1MzUtMGE0N2QzMzNmNmE4XkEyXkFqcGdeQXVyMjM3ODIzODE@._V1_SX300.jpg',
  },

  {
    Title: 'Another series',
    Year: '2020–',
    imdbID: 'tt10838180',
    Type: 'series',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMGJkNDJlZWUtOGM1Ny00YjNkLThiM2QtY2ZjMzQxMTIxNWNmXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg',
  },
  {
    Title: 'Tunna blå linjen',
    Year: '2021–',
    imdbID: 'tt12258710',
    Type: 'series',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYTJkMGFmMDgtY2UxMC00OTI2LTljN2EtZjNjOTcwZjg2NDYwXkEyXkFqcGdeQXVyMTAwMzM3NDI3._V1_SX300.jpg',
  },
  {
    Title: 'Bla Bla Baby',
    Year: String(new Date().getFullYear()),
    imdbID: 'tt0234215',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYzc5MWU3OGItMDVmZS00NjZmLWJlYzItNGQ2NzAyMDgwM2FhXkEyXkFqcGdeQXVyMTkxNjIwMTk@._V1_SX300.jpg',
  },
];

test('sorts ranged movies based on year newest -> oldest', () => {
  const sortedMovies = sortMoviesByYear(moviesWithRange);
  expect(sortedMovies[0].Year).toBe(String(new Date().getFullYear()));
  expect(sortedMovies[1].Year).toBe('2021–');
  expect(sortedMovies[2].Year).toBe('2021–');
  expect(sortedMovies[3].Year).toBe('2020–');
});

test('groups ranged movies based on year', () => {
  const sortedMovies = sortMoviesByYear(moviesWithRange);
  const groupedMovies = groupMoviesByYear(sortedMovies);

  expect(groupedMovies[0].year).toBe(String(new Date().getFullYear()));
  expect(groupedMovies[1].year).toBe('2021–');
  expect(groupedMovies[2].year).toBe('2020–');
});
