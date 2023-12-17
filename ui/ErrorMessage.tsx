import clsx from 'clsx';

interface ErrorMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  error?: string | string[];
}

export default function ErrorMessage({
  className,
  id,
  error,
  ...props
}: ErrorMessageProps) {
  return (
    <div id={id} aria-live="polite" aria-atomic="true" {...props}>
      {typeof error === 'string' ? (
        <p className={clsx('mt-2 text-sm text-red-500', className)} key={error}>
          {error}
        </p>
      ) : (
        error?.map((message) => (
          <p
            className={clsx('mt-2 text-sm text-red-500', className)}
            key={message}
          >
            {message}
          </p>
        ))
      )}
    </div>
  );
}
