import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from '@/lib/toast';
import { Toaster } from '@/components/Toaster';
import LandingPage from '@/pages/LandingPage';
import DashboardLayout from '@/layouts/DashboardLayout';
import DashboardPage from '@/pages/DashboardPage';
import ChatPage from '@/pages/ChatPage';
import CodeReviewPage from '@/pages/CodeReviewPage';
import BugFinderPage from '@/pages/BugFinderPage';
import SqlGeneratorPage from '@/pages/SqlGeneratorPage';
import EmailGeneratorPage from '@/pages/EmailGeneratorPage';
import DocumentationPage from '@/pages/DocumentationPage';
import SettingsPage from '@/pages/SettingsPage';

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="review" element={<CodeReviewPage />} />
            <Route path="bugs" element={<BugFinderPage />} />
            <Route path="sql" element={<SqlGeneratorPage />} />
            <Route path="email" element={<EmailGeneratorPage />} />
            <Route path="docs" element={<DocumentationPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </ToastProvider>
  );
}
