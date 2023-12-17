import TodoForm from '@/components/todos/TodoForm';
import TodoList from '@/components/todos/TodoList';
import { createTodo } from '@/components/todos/todoActions';

export default async function Page({
  searchParams,
}: {
  searchParams: {
    editingId?: string;
  };
}) {
  const editingId = searchParams?.editingId ?? '0';

  return (
    <div className="bg-slate-300 min-h-screen p-4">
      <h1 className="font-bold text-3xl mb-4">Welcome to Todo App</h1>
      <TodoForm action={createTodo} />
      <TodoList editingId={editingId} />
    </div>
  );
}
