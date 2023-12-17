import TodoForm from '@/components/todos/TodoForm';

export default async function Page() {
  return (
    <div className="bg-slate-300 h-screen p-4">
      <h1 className="font-bold text-3xl mb-4">Welcome to Todo App</h1>
      <TodoForm />
    </div>
  );
}