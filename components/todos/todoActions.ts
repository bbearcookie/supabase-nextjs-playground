'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { insertTodo } from './todoRepository';
import { State, createTodoSchema } from './todoSchema';

export async function createTodo(
  prevState: State<typeof createTodoSchema>,
  formData: FormData
) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const validatedFields = createTodoSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: '',
    };
  }

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    const { title, content } = validatedFields.data;

    await insertTodo(supabase, {
      title,
      content,
    });
  } catch (error) {
    return {
      message: 'hmm... something went wrong',
    };
  }

  revalidatePath('/todos');
  redirect('/todos');
}
