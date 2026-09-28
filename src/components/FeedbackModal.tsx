import { FiAlertCircle, FiCheck, FiLoader, FiMail, FiMessageSquare, FiSend } from 'react-icons/fi';
import { FEEDBACK_OPTIONS } from '@/lib/feedback/feedback-options';
import { CharacterLimit } from './CharacterLimit';
import { Input, fieldClassName } from './Input';
import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './Button';
import { Select } from './Select';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './shadcn/dialog';

export const FEEDBACK_BODY_CHARACTER_LIMIT = 500;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const labelClassName = 'text-base font-medium text-black dark:text-white';

export const FeedbackModal = ({ open, onOpenChange }: Props) => {
  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [category, setCategory] = useState(FEEDBACK_OPTIONS[0].label);
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const showEmailError = emailTouched && email.length > 0 && !isValidEmail;
  const canSubmit = isValidEmail && body.trim().length > 0 && !submitting;

  // Reset back to the form whenever the modal is reopened.
  const handleOpenChange = (next: boolean) => {
    if (next) {
      setSuccess(false);
      setError('');
    }
    onOpenChange(next);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setError('');
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, category, feedback: body }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      setEmail('');
      setEmailTouched(false);
      setCategory(FEEDBACK_OPTIONS[0].label);
      setBody('');
      setSuccess(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto">
        {success ? (
          <div className="flex flex-col items-center py-4 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 dark:bg-brand-500/15">
              <FiCheck className="text-3xl text-brand-700 dark:text-brand-400" />
            </div>
            <DialogTitle className="mt-4 tracking-tight">Thanks for the feedback!</DialogTitle>
            <DialogDescription className="mt-1">We&apos;ve received your message.</DialogDescription>
            <div className="mt-6 flex items-center gap-2">
              <Button type="button" variant="secondary" onClick={() => setSuccess(false)}>
                Send another
              </Button>
              <Button type="button" onClick={() => onOpenChange(false)}>
                Done
              </Button>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader className="flex-row items-center gap-3 pr-8">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-400">
                <FiMessageSquare className="text-lg" />
              </div>
              <div>
                <DialogTitle className="tracking-tight">Share your feedback</DialogTitle>
                <DialogDescription>Found a bug or have an idea?</DialogDescription>
              </div>
            </DialogHeader>

            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
              <label className="flex flex-col gap-1.5">
                <span className={labelClassName}>Email</span>
                <div className="relative">
                  <FiMail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-neutral-500" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setEmailTouched(true)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    aria-invalid={showEmailError}
                    required
                    className={cn(
                      'pl-10',
                      showEmailError && 'border-red-400 focus:border-red-500 focus:ring-red-500/15 dark:border-red-500/60'
                    )}
                  />
                </div>
                {showEmailError ? (
                  <span className="text-base text-red-600 dark:text-red-400">Enter a valid email address.</span>
                ) : null}
              </label>

              <label className="flex flex-col gap-1.5">
                <span className={labelClassName}>What&apos;s this about?</span>
                <Select
                  value={category}
                  onChange={setCategory}
                  options={FEEDBACK_OPTIONS.map(({ label }) => ({ value: label, text: label }))}
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className={labelClassName}>Feedback</span>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  onKeyDown={(e) => {
                    // Cmd/Ctrl + Enter sends the form.
                    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                      e.preventDefault();
                      formRef.current?.requestSubmit();
                    }
                  }}
                  placeholder="Tell us what's on your mind..."
                  maxLength={FEEDBACK_BODY_CHARACTER_LIMIT}
                  rows={5}
                  required
                  className={cn(fieldClassName, 'h-auto resize-none py-2.5')}
                />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 dark:text-neutral-500">
                    <kbd className="font-sans">⌘/Ctrl</kbd> + <kbd className="font-sans">Enter</kbd> to send
                  </span>
                  <CharacterLimit count={body.length} limit={FEEDBACK_BODY_CHARACTER_LIMIT} />
                </div>
              </label>

              {error ? (
                <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-base text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-400">
                  <FiAlertCircle className="shrink-0" />
                  {error}
                </div>
              ) : null}

              <div className="flex items-center justify-end gap-2 border-t pt-5">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={!canSubmit} className="min-w-[7rem] disabled:opacity-40">
                  {submitting ? (
                    <>
                      <FiLoader className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send
                      <FiSend />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
