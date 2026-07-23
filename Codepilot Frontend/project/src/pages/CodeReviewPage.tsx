import { useState } from 'react';
import { ToolHeader } from '@/components/ToolHeader';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { CopyButton } from '@/components/CopyButton';
import { EmptyState } from '@/components/EmptyState';
import { Spinner } from '@/components/Spinner';
import { LANGUAGES } from '@/lib/data';
import { useToast } from '@/lib/toast';
import { ScanEye, AlertTriangle, Lightbulb, Code2, ShieldCheck } from 'lucide-react';
import api from "../services/api";

interface ReviewResult {
  issues: string[];
  suggestions: string[];
  optimized: string;
  bestPractices: string[];
}

const SAMPLE: ReviewResult = {
  issues: [
    'Unused variable `result` declared on line 4.',
    'Potential null reference when accessing `data.items` without a guard.',
  'Array mutation inside `.map()` may cause unintended side effects.',
  ],
  suggestions: [
    'Use optional chaining (?.) when accessing nested properties.',
    'Replace `let` with `const` where reassignment is not needed.',
    'Extract the filtering logic into a named, testable function.',
  ],
  optimized: `const getActiveItems = (data) =>\n  data?.items?.filter((item) => item.active) ?? [];`,
  bestPractices: [
    'Prefer pure functions over in-place mutation.',
    'Always handle the empty/undefined case at the boundary.',
    'Keep functions small and single-responsibility.',
  ],
};

export default function CodeReviewPage() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReviewResult | null>(null);
  const { notify } = useToast();

  const analyze = async () => {
    if (!code.trim()) {
      notify("error", "Please paste some code first");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await api.post("/code-review", {
        message: code,
      });

      const aiResponse = response.data.message;

      setResult({
        issues: ["AI Code Review Completed"],
        suggestions: [aiResponse],
        optimized: aiResponse,
        bestPractices: [aiResponse],
      });

      notify("success", "Analysis complete");

    } catch (error: any) {

      console.error(error);

      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      notify("error", message);

    } finally {

      setLoading(false);

    }
  };
  return (
    <div className="mx-auto max-w-5xl">
      <ToolHeader title="Code Review" />
      <Card hover={false} className="mb-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="rounded-xl border border-border bg-base-card px-3 py-2 text-sm text-white outline-none focus:border-brand-primary/60"
          >
            {LANGUAGES.map((l) => (
              <option key={l} value={l} className="bg-base-secondary">{l}</option>
            ))}
          </select>
          <Button onClick={analyze} disabled={loading}>
            {loading ? <Spinner className="h-4 w-4" /> : <ScanEye className="h-4 w-4" />}
            Analyze Code
          </Button>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={`Paste your ${language} code here...`}
          className="h-64 w-full resize-y rounded-xl border border-border bg-base-primary/60 p-4 font-mono text-sm text-white/85 placeholder-white/30 outline-none focus:border-brand-primary/60"
        />
      </Card>

      {loading && (
        <Card hover={false} className="flex items-center justify-center gap-3 py-10">
          <Spinner /> <span className="text-white/60">Analyzing your code...</span>
        </Card>
      )}

      {!loading && !result && (
        <Card hover={false}>
          <EmptyState icon={<ScanEye className="h-7 w-7" />} title="No analysis yet" description="Paste your code and hit Analyze to get a detailed review." />
        </Card>
      )}

      {result && (
        <div className="space-y-5">
          <Card hover={false}>
            <div className="mb-3 flex items-center gap-2 text-brand-primary">
              <AlertTriangle className="h-5 w-5" />
              <h3 className="font-semibold text-white">Issues Found</h3>
            </div>
            <ul className="space-y-2">
              {result.issues.map((i, idx) => (
                <li key={idx} className="flex gap-2 text-sm text-white/75">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" /> {i}
                </li>
              ))}
            </ul>
          </Card>

          <Card hover={false}>
            <div className="mb-3 flex items-center gap-2 text-brand-primary">
              <Lightbulb className="h-5 w-5" />
              <h3 className="font-semibold text-white">Suggestions</h3>
            </div>
            <ul className="space-y-2">
              {result.suggestions.map((s, idx) => (
                <li key={idx} className="flex gap-2 text-sm text-white/75">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-primary" /> {s}
                </li>
              ))}
            </ul>
          </Card>

          <Card hover={false}>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-brand-primary">
                <Code2 className="h-5 w-5" />
                <h3 className="font-semibold text-white">Optimized Code</h3>
              </div>
              <CopyButton text={result.optimized} label="Copy code" />
            </div>
            <pre className="overflow-x-auto rounded-xl border border-border bg-base-primary/70 p-4 font-mono text-sm text-white/85">
{result.optimized}
            </pre>
          </Card>

          <Card hover={false}>
            <div className="mb-3 flex items-center gap-2 text-brand-primary">
              <ShieldCheck className="h-5 w-5" />
              <h3 className="font-semibold text-white">Best Practices</h3>
            </div>
            <ul className="space-y-2">
              {result.bestPractices.map((b, idx) => (
                <li key={idx} className="flex gap-2 text-sm text-white/75">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" /> {b}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
}
