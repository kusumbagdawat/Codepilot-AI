import { useState } from 'react';
import { ToolHeader } from '@/components/ToolHeader';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { CopyButton } from '@/components/CopyButton';
import { EmptyState } from '@/components/EmptyState';
import { Spinner } from '@/components/Spinner';
import {
  RECIPIENT_TYPES,
  EMAIL_TONES,
  EMAIL_PURPOSES,
} from '@/lib/data';
import { useToast } from '@/lib/toast';
import { Mail } from 'lucide-react';
import api from '../services/api';
import ReactMarkdown from 'react-markdown';

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-white/60">
        {label}
      </label>
      {children}
    </div>
  );
}

const selectClass =
  'w-full rounded-xl border border-border bg-base-card px-3 py-2.5 text-sm text-white outline-none focus:border-brand-primary/60';

export default function EmailGeneratorPage() {
  const [recipient, setRecipient] = useState(RECIPIENT_TYPES[0]);
  const [purpose, setPurpose] = useState(EMAIL_PURPOSES[0]);
  const [tone, setTone] = useState(EMAIL_TONES[0]);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const { notify } = useToast();

  const generate = async () => {
    setLoading(true);
    setEmail(null);

    try {
      const request = `
Recipient Type: ${recipient}
Purpose: ${purpose}
Tone: ${tone}

Generate a professional email.
`;

      const response = await api.post('/email-generator', {
        message: request,
      });

      setEmail(response.data.message);

      notify('success', 'Email generated');
    } catch (error: any) {
      console.error('Email Generator Error:', error);

      const message =
        error.response?.data?.message ||
        'Something went wrong. Please try again.';

      notify('error', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <ToolHeader title="Email Generator" />

      <Card hover={false} className="mb-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Recipient Type">
            <select
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className={selectClass}
            >
              {RECIPIENT_TYPES.map((r) => (
                <option
                  key={r}
                  value={r}
                  className="bg-base-secondary"
                >
                  {r}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Purpose">
            <select
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className={selectClass}
            >
              {EMAIL_PURPOSES.map((p) => (
                <option
                  key={p}
                  value={p}
                  className="bg-base-secondary"
                >
                  {p}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Tone">
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className={selectClass}
            >
              {EMAIL_TONES.map((t) => (
                <option
                  key={t}
                  value={t}
                  className="bg-base-secondary"
                >
                  {t}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="mt-5 flex justify-end">
          <Button onClick={generate} disabled={loading}>
            {loading ? (
              <Spinner className="h-4 w-4" />
            ) : (
              <Mail className="h-4 w-4" />
            )}
            Generate Email
          </Button>
        </div>
      </Card>

      {loading && (
        <Card
          hover={false}
          className="flex items-center justify-center gap-3 py-10"
        >
          <Spinner />
          <span className="text-white/60">
            Drafting your email...
          </span>
        </Card>
      )}

      {!loading && !email && (
        <Card hover={false}>
          <EmptyState
            icon={<Mail className="h-7 w-7" />}
            title="No email yet"
            description="Pick your options and click Generate Email to craft a professional message."
          />
        </Card>
      )}

      {email && (
        <Card hover={false}>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold text-white">
              Generated Email
            </h3>

            <CopyButton
              text={email}
              label="Copy email"
            />
          </div>

          <div className="rounded-xl border border-border bg-base-primary/70 p-5">
            <div className="prose prose-invert max-w-none text-sm leading-relaxed">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="mb-4 text-xl font-bold text-white">
                      {children}
                    </h1>
                  ),

                  h2: ({ children }) => (
                    <h2 className="mb-3 mt-5 text-lg font-semibold text-brand-primary">
                      {children}
                    </h2>
                  ),

                  h3: ({ children }) => (
                    <h3 className="mb-2 mt-4 text-base font-semibold text-white">
                      {children}
                    </h3>
                  ),

                  p: ({ children }) => (
                    <p className="mb-4 whitespace-pre-wrap text-white/85">
                      {children}
                    </p>
                  ),

                  strong: ({ children }) => (
                    <strong className="font-semibold text-white">
                      {children}
                    </strong>
                  ),

                  ul: ({ children }) => (
                    <ul className="mb-4 list-disc space-y-1.5 pl-6 text-white/85">
                      {children}
                    </ul>
                  ),

                  ol: ({ children }) => (
                    <ol className="mb-4 list-decimal space-y-1.5 pl-6 text-white/85">
                      {children}
                    </ol>
                  ),

                  li: ({ children }) => (
                    <li className="text-white/85">
                      {children}
                    </li>
                  ),
                }}
              >
                {email}
              </ReactMarkdown>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}