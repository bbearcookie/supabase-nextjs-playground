'use client';

import React from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation';
import ErrorMessage from '@/ui/ErrorMessage';
import SubmitButton from '@/ui/SubmitButton';
import { modifyTodo } from './todoActions';
import { modifyTodoSchema } from './todoSchema';

interface TodoEditFormProps {
  defaultValues?: {
    [key in keyof typeof modifyTodoSchema.shape]?: string;
  };
}

export default function TodoEditForm({ defaultValues }: TodoEditFormProps) {
  const initialState = {
    message: '',
    errors: {},
  };

  const [state, dispatch] = useFormState(modifyTodo, initialState);

  return (
    <form action={dispatch}>
      <div className="flex flex-col gap-2">
        <label className="flex flex-col" htmlFor="title">
          <span>제목</span>
          <input type="hidden" name="id" defaultValue={defaultValues?.id} />
          <input
            id="title"
            aria-describedby="title-error"
            defaultValue={defaultValues?.title}
            name="title"
            type="text"
            autoComplete="off"
          />
          <ErrorMessage id="title-error" error={state?.errors?.title} />
        </label>
        <label className="flex flex-col" htmlFor="content-id">
          <span>내용</span>
          <input
            id="content-id"
            aria-describedby="content-id-error"
            defaultValue={defaultValues?.content}
            name="content"
            type="text"
            autoComplete="off"
          />
          <ErrorMessage id="content-id-error" error={state?.errors?.content} />
        </label>
        <ErrorMessage error={state?.message} />
        <section className="flex gap-2 self-end">
          <SubmitButton>수정</SubmitButton>
          <CancelButton>취소</CancelButton>
        </section>
      </div>
    </form>
  );
}

function CancelButton({ children }: React.PropsWithChildren) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleCancel = async () => {
    const params = new URLSearchParams(searchParams);
    params.delete('editingId');
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <button
      className="self-end bg-gray-500 text-white cursor-pointer hover:bg-gray-700 p-2 rounded-lg mt-2 disabled:cursor-not-allowed disabled:opacity-50"
      type="button"
      onClick={handleCancel}
    >
      {children}
    </button>
  );
}
