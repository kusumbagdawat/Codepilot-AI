import { useState } from 'react';
import { ToolHeader } from '@/components/ToolHeader';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { CopyButton } from '@/components/CopyButton';
import { EmptyState } from '@/components/EmptyState';
import { Spinner } from '@/components/Spinner';
import { useToast } from '@/lib/toast';
import { Bug, Code2 } from 'lucide-react';
import api from '../services/api';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function BugFinderPage() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { notify } = useToast();

  const findBugs = async () => {
    if (!code.trim()) {
      notify('error', 'Please paste some code first');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await api.post('/bug-finder', {
        message: code,
      });

      setResult(response.data.message);

      notify('success', 'Bug analysis complete');
    } catch (error: any) {
      console.error('Bug Finder Error:', error);

      const message =
        error.response?.data?.message ||
        'Something went wrong. Please try again.';

      notify('error', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <ToolHeader title="Bug Finder" />

      <Card hover={false} className="mb-6">
        <div className="mb-3 flex items-center justify-end">
          <Button onClick={findBugs} disabled={loading}>
            {loading ? (
              <Spinner className="h-4 w-4" />
            ) : (
              <Bug className="h-4 w-4" />
            )}
            Find Bugs
          </Button>
        </div>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste the code you want to debug..."
          className="h-64 w-full resize-y rounded-xl border border-border bg-base-primary/60 p-4 font-mono text-sm text-white/85 placeholder-white/30 outline-none focus:border-brand-primary/60"
        />
      </Card>

      {loading && (
        <Card
          hover={false}
          className="flex items-center justify-center gap-3 py-10"
        >
          <Spinner />
          <span className="text-white/60">
            Hunting for bugs...
          </span>
        </Card>
      )}

      {!loading && !result && (
        <Card hover={false}>
          <EmptyState
            icon={<Bug className="h-7 w-7" />}
            title="No bugs detected yet"
            description="Paste your code and click Find Bugs to get a detailed report."
          />
        </Card>
      )}

      {result && (
        <div className="space-y-5">
          <Card hover={false}>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-brand-primary">
                <Bug className="h-5 w-5" />
                <h3 className="font-semibold text-white">
                  Bug Analysis
                </h3>
              </div>

              <CopyButton
                text={result}
                label="Copy analysis"
              />
            </div>

            <div className="prose prose-invert max-w-none text-sm leading-relaxed">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="mb-4 mt-6 text-xl font-bold text-white">
                      {children}
                    </h1>
                  ),

                  h2: ({ children }) => (
                    <h2 className="mb-3 mt-6 text-lg font-semibold text-brand-primary">
                      {children}
                    </h2>
                  ),

                  h3: ({ children }) => (
                    <h3 className="mb-2 mt-5 text-base font-semibold text-white">
                      {children}
                    </h3>
                  ),

                  strong: ({ children }) => (
                    <strong className="font-semibold text-white">
                      {children}
                    </strong>
                  ),

                  ul: ({ children }) => (
                    <ul className="mb-4 list-disc space-y-2 pl-6 text-white/80">
                      {children}
                    </ul>
                  ),

                  ol: ({ children }) => (
                    <ol className="mb-4 list-decimal space-y-2 pl-6 text-white/80">
                      {children}
                    </ol>
                  ),

                  li: ({ children }) => (
                    <li className="text-white/80">
                      {children}
                    </li>
                  ),

                  p: ({ children }) => (
                    <p className="mb-3 text-white/80">
                      {children}
                    </p>
                  ),

                  code({ className, children, ...props }) {
                    const match = /language-(\w+)/.exec(
                      className || ''
                    );

                    if (match) {
                      return (
                        <SyntaxHighlighter
                          style={oneDark}
                          language={match[1]}
                          PreTag="div"
                          className="rounded-xl !bg-base-primary/80 !p-4"
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      );
                    }

                    return (
                      <code
                        className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-brand-primary"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {result}
              </ReactMarkdown>
            </div>
          </Card>

          <Card hover={false}>
            <div className="mb-3 flex items-center gap-2 text-brand-primary">
              <Code2 className="h-5 w-5" />
              <h3 className="font-semibold text-white">
                About the Fix
              </h3>
            </div>

            <p className="text-sm text-white/60">
              The complete AI analysis above includes the identified
              bugs, their reasons, and the corrected code.
            </p>
          </Card>
        </div>
      )}
    </div>
  );
}