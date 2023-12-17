'use client';

import React from 'react';
import { useFormState } from 'react-dom';
import { createTodo } from './todoActions';
import ErrorMessage from '@/ui/ErrorMessage';
import SubmitButton from '@/ui/SubmitButton';

export default function TodoCreateForm() {
  const initialState = {
    message: '',
    errors: {},
  };

  const [state, dispatch] = useFormState(createTodo, initialState);

  return (
    <form action={dispatch}>
      <div className="flex flex-col gap-2">
        <label className="flex flex-col" htmlFor="title">
          <span>제목</span>
          <input
            id="title"
            aria-describedby="title-error"
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
            name="content"
            type="text"
            autoComplete="off"
          />
          <ErrorMessage id="content-id-error" error={state?.errors?.content} />
        </label>
        <ErrorMessage error={state?.message} />
        <section className="flex gap-2 self-end">
          <SubmitButton>추가</SubmitButton>
        </section>
      </div>
    </form>
  );
}
