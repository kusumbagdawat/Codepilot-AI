import { useState } from 'react';
import { ToolHeader } from '@/components/ToolHeader';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { CopyButton } from '@/components/CopyButton';
import { EmptyState } from '@/components/EmptyState';
import { Spinner } from '@/components/Spinner';
import { useToast } from '@/lib/toast';
import { Bug, AlertCircle, BookOpen, Code2 } from 'lucide-react';
import api from "../services/api";

interface BugResult {
  bugs: string[];
  explanation: string;
  fixed: string;
}

const SAMPLE: BugResult = {
  bugs: [
    'Off-by-one error in the loop boundary — `i <= arr.length` should be `i < arr.length`.',
    'Unhandled case when `arr` is empty or undefined.',
    'Mutating the input array while iterating over it.',
  ],
  explanation:
    'The loop runs one iteration too far, causing an undefined access at the final index. Additionally, the function does not guard against empty input, which can throw a runtime error. The fixed version uses a safe bound and returns an empty array for falsy input.',
  fixed: `const sumArray = (arr) => {\n  if (!arr?.length) return 0;\n  let sum = 0;\n  for (let i = 0; i < arr.length; i++) {\n    sum += arr[i];\n  }\n  return sum;\n};`,
};

export default function BugFinderPage() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BugResult | null>(null);
  const { notify } = useToast();

 const findBugs = async () => {
   if (!code.trim()) {
     notify("error", "Please paste some code first");
     return;
   }

   setLoading(true);
   setResult(null);

   try {
     const response = await api.post("/bug-finder", {
       message: code,
     });

     const aiResponse = response.data.message;

     setResult({
       bugs: ["AI Analysis Completed"],
       explanation: aiResponse,
       fixed: aiResponse,
     });

     notify("success", "Bug analysis complete");

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
      <ToolHeader title="Bug Finder" />
      <Card hover={false} className="mb-6">
        <div className="mb-3 flex items-center justify-end">
          <Button onClick={findBugs} disabled={loading}>
            {loading ? <Spinner className="h-4 w-4" /> : <Bug className="h-4 w-4" />}
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
        <Card hover={false} className="flex items-center justify-center gap-3 py-10">
          <Spinner /> <span className="text-white/60">Hunting for bugs...</span>
        </Card>
      )}

      {!loading && !result && (
        <Card hover={false}>
          <EmptyState icon={<Bug className="h-7 w-7" />} title="No bugs detected yet" description="Paste your code and click Find Bugs to get a detailed report." />
        </Card>
      )}

      {result && (
        <div className="space-y-5">
          <Card hover={false}>
            <div className="mb-3 flex items-center gap-2 text-brand-primary">
              <AlertCircle className="h-5 w-5" />
              <h3 className="font-semibold text-white">Bug List</h3>
            </div>
            <ul className="space-y-2">
              {result.bugs.map((b, idx) => (
                <li key={idx} className="flex gap-2 text-sm text-white/75">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" /> {b}
                </li>
              ))}
            </ul>
          </Card>

          <Card hover={false}>
            <div className="mb-3 flex items-center gap-2 text-brand-primary">
              <BookOpen className="h-5 w-5" />
              <h3 className="font-semibold text-white">Explanation</h3>
            </div>
            <p className="text-sm leading-relaxed text-white/75">{result.explanation}</p>
          </Card>

          <Card hover={false}>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-brand-primary">
                <Code2 className="h-5 w-5" />
                <h3 className="font-semibold text-white">Fixed Code</h3>
              </div>
              <CopyButton text={result.fixed} label="Copy code" />
            </div>
            <pre className="overflow-x-auto rounded-xl border border-border bg-base-primary/70 p-4 font-mono text-sm text-white/85">
{result.fixed}
            </pre>
          </Card>
        </div>
      )}
    </div>
  );
}
