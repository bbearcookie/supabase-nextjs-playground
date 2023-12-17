'use client';

import clsx from 'clsx';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

interface TodoRemoveButtonProps {
  id: number;
}

export default function TodoRemoveButton({ id }: TodoRemoveButtonProps) {
  const supabase = createClient();
  const router = useRouter();

  const handleRemoveTodo = async () => {
    const { data, status } = await supabase.from('todos').delete().eq('id', id);

    if (status === 204) {
      router.refresh();
    }
  };

  return (
    <button
      className={clsx(
        'cursor-pointer select-none p-2 rounded-md',
        'bg-red-500 text-white hover:bg-red-700'
      )}
      onClick={handleRemoveTodo}
    >
      삭제
    </button>
  );
}
