'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { createClient } from '@/utils/supabase/server';

const todoSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(1, { message: '제목을 입력해주세요' })
    .max(10, { message: '제목은 10자 이내로 입력해주세요' }),
  content: z
    .string()
    .min(1, { message: '내용을 입력해주세요' })
    .max(100, { message: '내용은 100자 이내로 입력해주세요' }),
  isDone: z.boolean(),
});

const createTodoSchema = todoSchema.omit({ id: true, isDone: true });

export type State = {
  message?: string;
  errors?: {
    [key in keyof z.infer<typeof createTodoSchema>]?: string[];
  };
};

export async function createTodo(prevState: State, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const validatedFields = createTodoSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  });

  console.log(validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: '',
    };
  }

  try {
    const { title, content } = validatedFields.data;

    console.log(title);
    console.log(content);

    throw new Error('test');
  } catch (error) {
    return {
      message: 'hmm... something went wrong',
    };
  }

  revalidatePath('/todos');
  redirect('/todos');
}
