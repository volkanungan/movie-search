import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LandingPage from './pages/LandingPage';
import Search from './pages/Search';
import Movie from './pages/Movie';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      cacheTime: 0,
    },
  },
});

function App() {
  return (
    <React.StrictMode>
      <Router>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/movie/:id" element={<Movie />} />
            <Route path="/search" element={<Search />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </QueryClientProvider>
      </Router>
    </React.StrictMode>
  );
}

const container = document.getElementById('root');

if (!container) {
  throw new Error('Cannot find the container element');
}

ReactDOM.createRoot(container).render(<App />);
