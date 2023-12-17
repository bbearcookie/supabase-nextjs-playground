'use client';

import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface TodoEditButtonProps {
  id: number;
}

export default function TodoEditButton({ id }: TodoEditButtonProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleEditTodo = async () => {
    const params = new URLSearchParams(searchParams);
    params.set('editingId', `${id}`);

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div
      className={clsx(
        'cursor-pointer select-none p-2 rounded-md',
        'bg-blue-500 text-white hover:bg-blue-700'
      )}
      onClick={handleEditTodo}
    >
      수정
    </div>
  );
}
