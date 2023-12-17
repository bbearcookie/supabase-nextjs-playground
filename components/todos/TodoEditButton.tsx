'use client';

import clsx from 'clsx';

interface TodoEditButtonProps {
  id: number;
}

export default function TodoEditButton({ id }: TodoEditButtonProps) {
  const handleRemoveTodo = async () => {
    console.log(id);
  };

  return (
    <div
      className={clsx(
        'cursor-pointer select-none p-2 rounded-md',
        'bg-blue-500 text-white hover:bg-blue-700'
      )}
      onClick={handleRemoveTodo}
    >
      수정
    </div>
  );
}
