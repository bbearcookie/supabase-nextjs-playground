import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import TodoEditButton from './TodoEditButton';
import TodoRemoveButton from './TodoRemoveButton';
import { createTodo } from '@/components/todos/todoActions';
import TodoForm from './TodoForm';

interface TodoListProps {
  editingId: string;
}

export default async function TodoList({ editingId }: TodoListProps) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: todos } = await supabase.from('todos').select('*');

  return (
    <ul>
      {todos?.map((todo) => (
        <li className="flex flex-col" key={todo.id}>
          {editingId === `${todo.id}` ? (
            <TodoForm action={createTodo} />
          ) : (
            <>
              <h2 className="font-bold text-xl">{todo.title}</h2>
              <p>{todo.content}</p>
              <div className="flex justify-self-end self-end gap-2">
                <TodoEditButton id={todo.id} />
                <TodoRemoveButton id={todo.id} />
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
