import { FEEDBACK_OPTIONS } from '@/lib/feedback/feedback-options';
import { FiChevronDown, FiSend, FiCheck } from 'react-icons/fi';
import { CharacterLimit } from './CharacterLimit';
import { useState } from 'react';
import { Button } from './Button';
import { toast } from 'sonner';
import {
  Dialog,
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

export const FeedbackModal = ({ open, onOpenChange }: Props) => {
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState(FEEDBACK_OPTIONS[0].label);
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canSubmit = isValidEmail && body.trim().length > 0 && !submitting;

  // Reset back to the form whenever the modal is reopened.
  const handleOpenChange = (next: boolean) => {
    if (next) setSuccess(false);
    onOpenChange(next);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
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
      setCategory(FEEDBACK_OPTIONS[0].label);
      setBody('');
      setSuccess(true);
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        {success ? (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <FiCheck className="text-3xl text-green-600" />
            </div>
            <DialogTitle className="tracking-tight">Thanks for the feedback!</DialogTitle>
            <DialogDescription>We&apos;ve received your message.</DialogDescription>
            <Button type="button" onClick={() => onOpenChange(false)} className="mt-3">
              Done
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="tracking-tight">Share your feedback</DialogTitle>
              <DialogDescription>Found a bug or have an idea? Let us know, we read everything.</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-800">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
              className="flex border items-center p-2 rounded-lg focus:outline-2 px-4"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-800">What&apos;s this about?</span>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full appearance-none border p-2 rounded-lg focus:outline-2 px-4 pr-10 bg-white cursor-pointer"
              >
                {FEEDBACK_OPTIONS.map(({ label }) => (
                  <option key={label} value={label}>
                    {label}
                  </option>
                ))}
              </select>
              <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-lg text-gray-500" />
            </div>
          </label>

          <label className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-800">Feedback</span>
              <CharacterLimit count={body.length} limit={FEEDBACK_BODY_CHARACTER_LIMIT} />
            </div>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Tell us what's on your mind..."
              maxLength={FEEDBACK_BODY_CHARACTER_LIMIT}
              rows={5}
              required
              className="flex border p-2 rounded-lg focus:outline-2 px-4 resize-none"
            />
          </label>

          <Button
            type="submit"
            disabled={!canSubmit}
            className="transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {submitting ? (
              'Sending...'
            ) : (
              <>
                Send
                <FiSend className="ml-2 text-lg" />
              </>
            )}
          </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
