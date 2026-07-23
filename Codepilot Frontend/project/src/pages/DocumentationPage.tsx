import { useState } from 'react';
import { ToolHeader } from '@/components/ToolHeader';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { CopyButton } from '@/components/CopyButton';
import { EmptyState } from '@/components/EmptyState';
import { Spinner } from '@/components/Spinner';
import { useToast } from '@/lib/toast';
import { FileText } from 'lucide-react';
import api from "../services/api";

const SAMPLE_DOCS = `## sumArray(arr)

Sums all numeric values in an array.

### Parameters
- \`arr\` (Array<number>): The array of numbers to sum.

### Returns
- \`number\`: The total sum. Returns \`0\` for empty or falsy input.

### Example
\`\`\`js
sumArray([1, 2, 3]); // 6
sumArray([]);         // 0
sumArray(null);       // 0
\`\`\`

### Notes
- Handles empty/undefined input safely.
- Does not mutate the input array.
- Time complexity: O(n).`;

export default function DocumentationPage() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [docs, setDocs] = useState<string | null>(null);
  const { notify } = useToast();

 const generate = async () => {
   if (!code.trim()) {
     notify("error", "Please paste some code first");
     return;
   }

   setLoading(true);
   setDocs(null);

   try {
     const response = await api.post("/documentation", {
       message: code,
     });

     setDocs(response.data.message);

     notify("success", "Documentation generated");

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
    <div className="mx-auto max-w-4xl">
      <ToolHeader title="Documentation Generator" />
      <Card hover={false} className="mb-6">
        <div className="mb-3 flex items-center justify-end">
          <Button onClick={generate} disabled={loading}>
            {loading ? <Spinner className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
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
        <Card hover={false} className="flex items-center justify-center gap-3 py-10">
          <Spinner /> <span className="text-white/60">Writing documentation...</span>
        </Card>
      )}

      {!loading && !docs && (
        <Card hover={false}>
          <EmptyState icon={<FileText className="h-7 w-7" />} title="No documentation yet" description="Paste your code and click Generate to create clean developer docs." />
        </Card>
      )}

      {docs && (
        <Card hover={false}>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold text-white">Generated Documentation</h3>
            <CopyButton text={docs} label="Copy docs" />
          </div>
          <pre className="overflow-x-auto rounded-xl border border-border bg-base-primary/70 p-4 font-mono text-sm leading-relaxed text-white/85">
{docs}
          </pre>
        </Card>
      )}
    </div>
  );
}
