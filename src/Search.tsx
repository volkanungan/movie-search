import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import Loading from './components/Loading';
import MovieList from './components/MovieList';
import fetchMovies from './helpers/fetchMovies';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import ErrorMessage from './components/ErrorMessage';

export default function Search() {
  const [groupedMovies, setGroupedMovies] = useState();
  const useQueryParams = () => new URLSearchParams(useLocation().search);
  let queryParams = useQueryParams();
  const searchQuery = queryParams.get('title') ?? '';

  const worker = new Worker('src/helpers/groupMoviesByYear.ts', {
    type: 'module',
  });

  useEffect(() => {
    worker.addEventListener('message', (message) => {
      if (message && message.data) {
        setGroupedMovies(message.data);
      }
      return () => worker.terminate();
    });
  }, [worker]);

  const results = useQuery(['search', searchQuery], fetchMovies, {
    onSuccess: (data) => {
      if (data?.Response === 'False' || data?.Search?.length === 0) {
        return;
      }
      worker.postMessage({
        command: 'group',
        movies: data.Search,
      });
    },
  });

  if (searchQuery.length === 0) {
    return <ErrorMessage>No search query given</ErrorMessage>;
  }

  if (results.isLoading) {
    return <Loading />;
  }

  if (
    results.data?.Response === 'False' ||
    results.data?.Search?.length === 0
  ) {
    return <ErrorMessage>Sorry, no movies have been found.</ErrorMessage>;
  }

  if (!groupedMovies) {
    return <Loading />;
  }

  return (
    <div>
      <Header />
      <MovieList moviesByYear={groupedMovies} />
    </div>
  );
}
