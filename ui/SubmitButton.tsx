import { useFormStatus } from 'react-dom';

export default function SubmitButton({ children }: React.PropsWithChildren) {
  const { pending } = useFormStatus();

  return (
    <button
      className="self-end bg-green-500 text-white cursor-pointer hover:bg-green-700 p-2 rounded-lg mt-2 disabled:cursor-not-allowed disabled:opacity-50"
      type="submit"
      disabled={pending}
      aria-disabled={pending}
    >
      {children}
    </button>
  );
}
