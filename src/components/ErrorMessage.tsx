import Header from './Header';

export default function ErrorMessage({
  children,
  searchQuery,
}: {
  children: React.ReactNode;
  searchQuery: string;
}) {
  return (
    <div>
      <Header searchQuery={searchQuery} />
      <h1 className="mx-14 my-6 text-lg font-alternative font-extrabold drop-shadow-sm text-slate-gray">
        {children}
      </h1>
    </div>
  );
}
