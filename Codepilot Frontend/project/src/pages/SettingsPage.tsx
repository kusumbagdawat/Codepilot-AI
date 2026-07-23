import { useState } from 'react';
import { ToolHeader } from '@/components/ToolHeader';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { useToast } from '@/lib/toast';
import { Bell, Globe, Palette, Shield } from 'lucide-react';

function Toggle({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn((o) => !o)}
      className={`relative h-6 w-11 rounded-full transition ${on ? 'bg-brand-primary' : 'bg-white/15'}`}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${on ? 'left-[22px]' : 'left-0.5'}`} />
    </button>
  );
}

export default function SettingsPage() {
  const { notify } = useToast();
  return (
    <div className="mx-auto max-w-3xl">
      <ToolHeader title="Settings" />
      <div className="space-y-5">
        <Card hover={false}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-brand-primary/10 text-brand-primary">
                <Bell className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Notifications</h3>
                <p className="text-sm text-white/50">Get notified about tool updates.</p>
              </div>
            </div>
            <Toggle defaultOn />
          </div>
        </Card>
        <Card hover={false}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-brand-primary/10 text-brand-primary">
                <Palette className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Theme</h3>
                <p className="text-sm text-white/50">Currently using the dark green theme.</p>
              </div>
            </div>
            <Toggle defaultOn />
          </div>
        </Card>
        <Card hover={false}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-brand-primary/10 text-brand-primary">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Language</h3>
                <p className="text-sm text-white/50">Interface language preference.</p>
              </div>
            </div>
            <select className="rounded-xl border border-border bg-base-card px-3 py-2 text-sm text-white outline-none focus:border-brand-primary/60">
              <option className="bg-base-secondary">English</option>
              <option className="bg-base-secondary">Spanish</option>
              <option className="bg-base-secondary">French</option>
            </select>
          </div>
        </Card>
        <Card hover={false}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-brand-primary/10 text-brand-primary">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Privacy</h3>
                <p className="text-sm text-white/50">Allow usage analytics to improve the product.</p>
              </div>
            </div>
            <Toggle />
          </div>
        </Card>
        <div className="flex justify-end">
          <Button onClick={() => notify('success', 'Settings saved')}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
