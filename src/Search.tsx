import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import Loading from './components/Loading';
import MovieList from './components/MovieList';
import fetchMovies from './helpers/fetchMovies';
import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import ErrorMessage from './components/ErrorMessage';

export default function Search() {
  const [groupedMovies, setGroupedMovies] = useState();
  const worker = useRef<Worker>();
  const useQueryParams = () => new URLSearchParams(useLocation().search);
  let queryParams = useQueryParams();
  const searchQuery = queryParams.get('title') ?? '';
  const searchType = queryParams.get('type') ?? '';

  if (!worker.current) {
    worker.current = new Worker(
      new URL('./helpers/groupMoviesByYear.ts', import.meta.url),
      {
        type: 'module',
      }
    );
  }

  useEffect(() => {
    if (!worker.current) {
      return;
    }
    worker.current.addEventListener('message', (message) => {
      if (message && message.data) {
        setGroupedMovies(message.data);
      }
      return () => worker.current?.terminate();
    });
  }, [worker.current]);

  const results = useQuery(['search', searchQuery, searchType], fetchMovies, {
    onSuccess: (data) => {
      if (
        data?.Response === 'False' ||
        data?.Search?.length === 0 ||
        !worker.current
      ) {
        return;
      }

      worker.current.postMessage({
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
    return (
      <ErrorMessage searchQuery={searchQuery} searchType={searchType}>
        Sorry, no movies have been found.
      </ErrorMessage>
    );
  }

  if (!groupedMovies) {
    return <Loading />;
  }

  return (
    <div>
      <Header initialSearchQuery={searchQuery} searchType={searchType} />
      <MovieList moviesByYear={groupedMovies} />
    </div>
  );
}
