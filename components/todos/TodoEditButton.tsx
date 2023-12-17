'use client';

import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createTodoSchema } from './todoSchema';

interface TodoEditButtonProps {
  id: number;
  defaultValues?: {
    [key in keyof typeof createTodoSchema.shape]: string | null;
  };
}

export default function TodoEditButton({
  id,
  defaultValues,
}: TodoEditButtonProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleEditTodo = async () => {
    const params = new URLSearchParams(searchParams);

    params.set('editingId', `${id}`);
    params.set('title', defaultValues?.title ?? '');
    params.set('content', defaultValues?.content ?? '');

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
