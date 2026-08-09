import { useState } from 'react';
import { ToolHeader } from '@/components/ToolHeader';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { CopyButton } from '@/components/CopyButton';
import { EmptyState } from '@/components/EmptyState';
import { Spinner } from '@/components/Spinner';
import { useToast } from '@/lib/toast';
import { FileText } from 'lucide-react';
import api from '../services/api';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function DocumentationPage() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [docs, setDocs] = useState<string | null>(null);
  const { notify } = useToast();

  const generate = async () => {
    if (!code.trim()) {
      notify('error', 'Please paste some code first');
      return;
    }

    setLoading(true);
    setDocs(null);

    try {
      const response = await api.post('/documentation', {
        message: code,
      });

      setDocs(response.data.message);

      notify('success', 'Documentation generated');
    } catch (error: any) {
      console.error('Documentation Error:', error);

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
      <ToolHeader title="Documentation Generator" />

      <Card hover={false} className="mb-6">
        <div className="mb-3 flex items-center justify-end">
          <Button onClick={generate} disabled={loading}>
            {loading ? (
              <Spinner className="h-4 w-4" />
            ) : (
              <FileText className="h-4 w-4" />
            )}
            Generate Documentation
          </Button>
        </div>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste the code you want to document..."
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
            Writing documentation...
          </span>
        </Card>
      )}

      {!loading && !docs && (
        <Card hover={false}>
          <EmptyState
            icon={<FileText className="h-7 w-7" />}
            title="No documentation yet"
            description="Paste your code and click Generate to create clean developer docs."
          />
        </Card>
      )}

      {docs && (
        <Card hover={false}>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold text-white">
              Generated Documentation
            </h3>

            <CopyButton
              text={docs}
              label="Copy docs"
            />
          </div>

          <div className="rounded-xl border border-border bg-base-primary/70 p-5">
            <div className="prose prose-invert max-w-none text-sm leading-relaxed">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="mb-4 mt-6 text-2xl font-bold text-white">
                      {children}
                    </h1>
                  ),

                  h2: ({ children }) => (
                    <h2 className="mb-3 mt-6 text-xl font-semibold text-brand-primary">
                      {children}
                    </h2>
                  ),

                  h3: ({ children }) => (
                    <h3 className="mb-2 mt-5 text-lg font-semibold text-white">
                      {children}
                    </h3>
                  ),

                  p: ({ children }) => (
                    <p className="mb-4 text-white/80">
                      {children}
                    </p>
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
                          className="my-4 rounded-xl !bg-base-primary/80 !p-4 text-sm"
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
                {docs}
              </ReactMarkdown>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}