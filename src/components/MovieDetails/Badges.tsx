import { Fragment } from 'react';

type BadgesProps = {
  director: string;
  writer: string;
  actors: string;
  language: string;
};

export default function Badges({
  director,
  writer,
  actors,
  language,
}: BadgesProps) {
  return (
    <dl className="grid grid-cols-4 gap-2 font-alternative my-4 text-sm">
      {[
        ['Director', director],
        ['Writer', writer],
        ['Actors', actors],
        ['Language', language],
      ].map(([label, data]) => (
        <Fragment key={label}>
          <dt className="col-span-1 text-end font-bold text-bistre tracking-wide">
            {label}
          </dt>
          <dd className="col-span-3">{data}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
