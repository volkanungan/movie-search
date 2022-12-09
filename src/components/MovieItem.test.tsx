import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import MovieItem from './MovieItem';

test('displays a default thumbnail', async () => {
  const movieItem = render(
    <MovieItem
      imdbID="123"
      poster="N/A"
      title="Ghost Busters"
      type="movie"
      year="1996"
    />
  );

  const movieThumbnail = (await movieItem.findByTestId(
    'thumbnail'
  )) as HTMLImageElement;
  expect(movieThumbnail.src).toContain('film-solid.svg');
  movieItem.unmount();
});
