import Header from './Header';

export default function ErrorMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <h1 className="mx-14 my-6 text-lg font-alternative font-extrabold drop-shadow-sm text-slate-gray">
        {children}
      </h1>
    </div>
  );
}
