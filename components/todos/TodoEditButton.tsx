'use client';

import clsx from 'clsx';

export default function TodoEditButton() {
  return (
    <div
      className={clsx(
        'cursor-pointer select-none p-2 rounded-md',
        'bg-blue-500 text-white hover:bg-blue-700'
      )}
    >
      수정
    </div>
  );
}
