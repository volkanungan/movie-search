import Header from './Header';

export default function ErrorMessage({
  children,
  searchQuery,
  searchType,
}: {
  children: React.ReactNode;
  searchQuery: string;
  searchType?: string;
}) {
  return (
    <div>
      <Header initialSearchQuery={searchQuery} searchType={searchType} />
      <h1 className="mx-14 my-6 text-lg font-alternative font-extrabold drop-shadow-sm text-slate-gray">
        {children}
      </h1>
    </div>
  );
}
