import { useQuery } from '@tanstack/react-query';
import { Navigate, useParams } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MovieDetails from '../components/MovieDetails';
import fetchMovieDetails from '../lib/fetch/fetchMovieDetails';

export default function Movie() {
  let { id } = useParams();
  if (!id) {
    return <Navigate to="/" />;
  }

  const results = useQuery(['details', id], fetchMovieDetails);

  if (results.isLoading) {
    return <Loading />;
  }

  if (!results.data) {
    return <ErrorMessage>Movie could not have been loaded</ErrorMessage>;
  }

  return (
    <>
      <Header />
      <MovieDetails movie={results.data} />
    </>
  );
}
