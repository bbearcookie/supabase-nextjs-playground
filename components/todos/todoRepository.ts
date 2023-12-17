import { createClient as createServerClient } from '@/utils/supabase/server';
import { createClient as createBrowserClient } from '@/utils/supabase/client';

export async function insertTodo(
  client: ReturnType<typeof createServerClient | typeof createBrowserClient>,
  {
    title,
    content,
  }: {
    title: string;
    content: string;
  }
) {
  const { data, error } = await client.from('todos').insert([
    {
      title,
      content,
      isDone: false,
    },
  ]);

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

export async function updateTodo(
  client: ReturnType<typeof createServerClient | typeof createBrowserClient>,
  {
    id,
    title,
    content,
  }: {
    id: string;
    title: string;
    content: string;
  }
) {
  const { data, error } = await client
    .from('todos')
    .update({ title, content })
    .match({ id });

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}
