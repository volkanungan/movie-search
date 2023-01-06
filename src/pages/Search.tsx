import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import MovieList from '../components/MovieList';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ErrorMessage from '../components/ErrorMessage';
import fetchMovies from '../lib/fetch/fetchMovies';
import worker from '../lib/worker/worker';

export default function Search() {
  const [groupedMovies, setGroupedMovies] = useState();
  const useQueryParams = () => new URLSearchParams(useLocation().search);
  let queryParams = useQueryParams();
  const searchQuery = queryParams.get('title') ?? '';
  const searchType = queryParams.get('type') ?? '';

  worker.addEventListener('message', (message) => {
    if (message && message.data) {
      setGroupedMovies(message.data);
    }
  });

  const results = useQuery(['search', searchQuery, searchType], fetchMovies, {
    onSuccess: (data) => {
      if (data?.Response === 'False' || data?.Search?.length === 0 || !worker) {
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
