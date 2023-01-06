export default new Worker(new URL('./groupMoviesByYear.ts', import.meta.url), {
  type: 'module',
});
