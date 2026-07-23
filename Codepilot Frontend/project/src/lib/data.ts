import type { ToolMeta } from './types';

export const TOOLS: ToolMeta[] = [
  {
    id: 'chat',
    title: 'AI Chat',
    description: 'Chat with your AI assistant about code, architecture, and best practices.',
    path: '/app/chat',
    icon: 'MessageSquare',
    accent: 'from-emerald-400/20 to-emerald-600/5',
  },
  {
    id: 'review',
    title: 'Code Review',
    description: 'Analyze code for issues, suggestions, and optimized implementations.',
    path: '/app/review',
    icon: 'ScanEye',
    accent: 'from-teal-400/20 to-emerald-600/5',
  },
  {
    id: 'bugs',
    title: 'Bug Finder',
    description: 'Detect bugs, understand root causes, and get fixed code instantly.',
    path: '/app/bugs',
    icon: 'Bug',
    accent: 'from-green-400/20 to-emerald-600/5',
  },
  {
    id: 'sql',
    title: 'SQL Generator',
    description: 'Describe what you need in plain English and get production-ready SQL.',
    path: '/app/sql',
    icon: 'Database',
    accent: 'from-cyan-400/20 to-emerald-600/5',
  },
  {
    id: 'email',
    title: 'Email Generator',
    description: 'Craft professional emails with the perfect tone for any recipient.',
    path: '/app/email',
    icon: 'Mail',
    accent: 'from-lime-400/20 to-emerald-600/5',
  },
  {
    id: 'docs',
    title: 'Documentation Generator',
    description: 'Turn any code block into clean, readable developer documentation.',
    path: '/app/docs',
    icon: 'FileText',
    accent: 'from-emerald-400/20 to-teal-600/5',
  },
];

export const LANGUAGES = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C++',
  'C#',
  'Go',
  'Rust',
  'PHP',
  'Ruby',
  'Swift',
  'Kotlin',
];

export const RECIPIENT_TYPES = [
  'Client',
  'Team Member',
  'Manager',
  'Recruiter',
  'Vendor',
  'Customer Support',
];

export const EMAIL_TONES = ['Professional', 'Friendly', 'Formal', 'Apologetic', 'Persuasive', 'Urgent'];

export const EMAIL_PURPOSES = [
  'Project Update',
  'Meeting Request',
  'Bug Report',
  'Feature Proposal',
  'Follow-up',
  'Thank You',
  'Job Application',
  'Resignation',
];
