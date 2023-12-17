import { ZodType, z } from 'zod';

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

export const createTodoSchema = todoSchema.omit({ id: true, isDone: true });
export const modifyTodoSchema = todoSchema.omit({ isDone: true });

export type State<T extends ZodType> = {
  message?: string;
  errors?: {
    [key in keyof z.infer<T>]?: string[];
  };
};
