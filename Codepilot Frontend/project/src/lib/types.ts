export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: number;
}

export type ToolId =
  | 'chat'
  | 'review'
  | 'bugs'
  | 'sql'
  | 'email'
  | 'docs';

export interface ToolMeta {
  id: ToolId;
  title: string;
  description: string;
  path: string;
  icon: string;
  accent: string;
}
