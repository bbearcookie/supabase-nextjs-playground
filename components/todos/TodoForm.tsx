'use client';

import React, { useId } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { createTodo, initialState } from './todoActions';
import clsx from 'clsx';

export default function TodoForm() {
  const [state, dispatch] = useFormState(createTodo, initialState);
  const titleId = useId();
  const contentId = useId();

  return (
    <form action={dispatch}>
      <div className="flex flex-col gap-2">
        <label className="flex flex-col" htmlFor={titleId}>
          <span>제목</span>
          <input id={titleId} name="title" type="text" autoComplete="off" />
          <ErrorMessage id={titleId + '-error'} error={state.errors?.title} />
        </label>
        <label className="flex flex-col" htmlFor={contentId}>
          <span>내용</span>
          <input id={contentId} name="content" type="text" autoComplete="off" />
          <ErrorMessage
            id={contentId + '-error'}
            error={state.errors?.content}
          />
        </label>
        <SubmitButton>추가</SubmitButton>
      </div>
    </form>
  );
}

function SubmitButton({ children }: React.PropsWithChildren) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="self-end bg-green-500 cursor-pointer hover:bg-green-400 p-2 rounded-lg mt-2 disabled:cursor-not-allowed disabled:opacity-50"
      disabled={pending}
      aria-disabled={pending}
    >
      {children}
    </button>
  );
}

interface ErrorMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  error?: string[];
}

function ErrorMessage({ className, id, error, ...props }: ErrorMessageProps) {
  return (
    <div id={id} aria-live="polite" aria-atomic="true" {...props}>
      {error?.map((message) => (
        <p
          className={clsx('mt-2 text-sm text-red-500', className)}
          key={message}
        >
          {message}
        </p>
      ))}
    </div>
  );
}
