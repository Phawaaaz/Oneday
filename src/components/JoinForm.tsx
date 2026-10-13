import { useState, type FormEvent, type ReactNode } from 'react';
import { Icon } from './Icon';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Props = {
  id: string;
  className: string;
  placeholder: string;
  button: ReactNode;
  onJoined?: () => void;
};

/** Early access email form. Concept only: nothing is sent anywhere yet. */
export function JoinForm({ id, className, placeholder, button, onJoined }: Props) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [joined, setJoined] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = email.trim();
    if (!EMAIL.test(value)) {
      setError(value ? 'That email looks incomplete. Check the @ and the dot.' : 'Add your email so we can tell you when it opens.');
      (e.currentTarget.elements.namedItem('email') as HTMLInputElement).focus();
      return;
    }
    setJoined(true);
    onJoined?.();
  };

  return (
    <>
      <form className={error ? `${className} bad` : className} noValidate onSubmit={submit}>
        <label className="vh" htmlFor={id}>
          Email
        </label>
        <input
          className="field"
          id={id}
          type="email"
          name="email"
          placeholder={placeholder}
          autoComplete="email"
          required
          value={email}
          disabled={joined}
          aria-invalid={error ? true : undefined}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError('');
          }}
        />
        <button className="btn" type="submit" disabled={joined}>
          {button}
        </button>
      </form>
      <div className={joined ? 'note ok' : error ? 'note err' : 'note'} aria-live="polite">
        {joined ? (
          <>
            <Icon name="check" small />
            You’re on the list.
          </>
        ) : (
          error
        )}
      </div>
    </>
  );
}
