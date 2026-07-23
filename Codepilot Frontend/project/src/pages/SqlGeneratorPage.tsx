import { useState } from 'react';
import { ToolHeader } from '@/components/ToolHeader';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { CopyButton } from '@/components/CopyButton';
import { EmptyState } from '@/components/EmptyState';
import { Spinner } from '@/components/Spinner';
import { useToast } from '@/lib/toast';
import { Database } from 'lucide-react';
import api from "../services/api";

const SAMPLE_SQL = `SELECT
  u.id,
  u.name,
  u.email,
  COUNT(o.id) AS total_orders,
  SUM(o.amount) AS lifetime_value
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE u.created_at >= NOW() - INTERVAL '30 days'
GROUP BY u.id, u.name, u.email
HAVING SUM(o.amount) > 500
ORDER BY lifetime_value DESC;`;

export default function SqlGeneratorPage() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [sql, setSql] = useState<string | null>(null);
  const { notify } = useToast();

  const generate = async() => {
    if (!prompt.trim()) {
      notify('error', 'Please describe the query you need');
      return;
    }
 setLoading(true);
 setSql(null);

 try {

     const response = await api.post("/sql-generator", {
         message: prompt,
     });

     setSql(response.data.message);

     notify("success", "SQL generated");

 }catch (error: any) {

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
      <ToolHeader title="SQL Generator" />
      <Card hover={false} className="mb-6">
        <label className="mb-2 block text-sm text-white/60">Describe the query you need</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. Get all users who placed more than $500 in orders in the last 30 days, sorted by lifetime value"
          className="h-32 w-full resize-y rounded-xl border border-border bg-base-primary/60 p-4 text-sm text-white/85 placeholder-white/30 outline-none focus:border-brand-primary/60"
        />
        <div className="mt-3 flex justify-end">
          <Button onClick={generate} disabled={loading}>
            {loading ? <Spinner className="h-4 w-4" /> : <Database className="h-4 w-4" />}
            Generate SQL
          </Button>
        </div>
      </Card>

      {loading && (
        <Card hover={false} className="flex items-center justify-center gap-3 py-10">
          <Spinner /> <span className="text-white/60">Generating SQL...</span>
        </Card>
      )}

      {!loading && !sql && (
        <Card hover={false}>
          <EmptyState icon={<Database className="h-7 w-7" />} title="No query yet" description="Describe what you need in plain English and get production-ready SQL." />
        </Card>
      )}

      {sql && (
        <Card hover={false}>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold text-white">Generated SQL</h3>
            <CopyButton text={sql} label="Copy SQL" />
          </div>
          <pre className="overflow-x-auto rounded-xl border border-border bg-base-primary/70 p-4 font-mono text-sm text-white/85">
{sql}
          </pre>
        </Card>
      )}
    </div>
  );
}
