import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import TodoEditButton from './TodoEditButton';
import TodoRemoveButton from './TodoRemoveButton';

export default async function TodoList() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: todos } = await supabase.from('todos').select('*');

  console.log(todos);

  return (
    <ul>
      {todos?.map((todo) => (
        <li className="flex flex-col" key={todo.id}>
          <h2 className="font-bold text-xl">{todo.title}</h2>
          <p>{todo.content}</p>
          <div className="flex justify-self-end self-end gap-2">
            <TodoEditButton />
            <TodoRemoveButton id={todo.id} />
          </div>
        </li>
      ))}
    </ul>
  );
}
