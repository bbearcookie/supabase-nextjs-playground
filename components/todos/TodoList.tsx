import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import TodoEditButton from './TodoEditButton';
import TodoRemoveButton from './TodoRemoveButton';

import TodoEditForm from './TodoEditForm';

interface TodoListProps {
  searchParams: {
    editingId?: string;
    title?: string;
    content?: string;
  };
}

export default async function TodoList({ searchParams }: TodoListProps) {
  const editingId = searchParams?.editingId ?? '0';
  const title = searchParams?.title ?? '';
  const content = searchParams?.content ?? '';

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: todos } = await supabase.from('todos').select('*');

  return (
    <ul>
      {todos?.map((todo) => (
        <li className="flex flex-col" key={todo.id}>
          {editingId === `${todo.id}` ? (
            <TodoEditForm defaultValues={{ id: editingId, title, content }} />
          ) : (
            <>
              <h2 className="font-bold text-xl">{todo.title}</h2>
              <p>{todo.content}</p>
              <div className="flex justify-self-end self-end gap-2">
                <TodoEditButton id={todo.id} defaultValues={{ ...todo }} />
                <TodoRemoveButton id={todo.id} />
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
