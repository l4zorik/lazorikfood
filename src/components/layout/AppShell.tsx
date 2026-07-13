import { Sidebar } from "@/components/layout/Sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-50">
      <Sidebar />
      <main className="ml-64 min-h-screen">{children}</main>
    </div>
  );
}
