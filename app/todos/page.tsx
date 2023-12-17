import TodoCreateForm from '@/components/todos/TodoCreateForm';
import TodoList from '@/components/todos/TodoList';

export default async function Page({ searchParams }: { searchParams: Object }) {
  return (
    <div className="bg-slate-300 min-h-screen p-4">
      <h1 className="font-bold text-3xl mb-4">Welcome to Todo App</h1>
      <TodoCreateForm />
      <TodoList searchParams={searchParams} />
    </div>
  );
}
