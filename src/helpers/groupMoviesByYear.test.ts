import { expect, test } from 'vitest';
import { Movie } from './APIResponsesTypes';
import { exportedForTesting } from './groupMoviesByYear';
const { getLastYear, sortMoviesByYear, groupMoviesByYear } = exportedForTesting;

test('parses last year if it is a closed range', () => {
  const year = '1996–2012';
  expect(getLastYear(year)).toBe(2012);
});

test('parses current year if it is an open range', () => {
  const year = '1996–';
  const currentYear = new Date().getFullYear();
  expect(getLastYear(year)).toBe(currentYear);
});

test('parses first year if it NOT a range', () => {
  const year = '1996';
  expect(getLastYear(year)).toBe(1996);
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
        Title: 'The Matrix Resurrections',
        Year: '2021',
        imdbID: 'tt10838180',
        Type: 'movie',
        Poster:
          'https://m.media-amazon.com/images/M/MV5BMGJkNDJlZWUtOGM1Ny00YjNkLThiM2QtY2ZjMzQxMTIxNWNmXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg',
      },
      {
        Title: 'A Glitch in the Matrix',
        Year: '2021',
        imdbID: 'tt9847360',
        Type: 'movie',
        Poster:
          'https://m.media-amazon.com/images/M/MV5BMWRhNGY3NGQtMDAxMS00YjY2LTgzOTUtZjljZmUyYWQwMGI2XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg',
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
