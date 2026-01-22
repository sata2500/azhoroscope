/**
 * Dashboard Layout
 * 
 * Kullanıcı dashboard sayfaları için layout
 */

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Dashboard Header */}
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="flex-1">
        <div className="container py-8">{children}</div>
      </main>
    </div>
  );
}
