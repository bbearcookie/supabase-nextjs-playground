'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { insertTodo, updateTodo } from './todoRepository';
import { State, createTodoSchema, modifyTodoSchema } from './todoSchema';

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

export async function modifyTodo(
  prevState: State<typeof modifyTodoSchema>,
  formData: FormData
) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const validatedFields = modifyTodoSchema.safeParse({
    id: formData.get('id'),
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
    const { id, title, content } = validatedFields.data;

    await updateTodo(supabase, {
      id,
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
