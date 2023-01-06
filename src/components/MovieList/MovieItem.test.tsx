import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import MovieItem from './MovieItem';
import { MemoryRouter } from 'react-router-dom';

test('displays a default thumbnail', async () => {
  const movieItem = render(
    <MemoryRouter>
      <MovieItem
        imdbID="123"
        poster="N/A"
        title="Ghost Busters"
        type="movie"
        year="1996"
      />
    </MemoryRouter>
  );

  const movieThumbnail = (await movieItem.findByTestId(
    'thumbnail'
  )) as HTMLImageElement;
  expect(movieThumbnail.src).toContain('film-solid.svg');
  movieItem.unmount();
});
