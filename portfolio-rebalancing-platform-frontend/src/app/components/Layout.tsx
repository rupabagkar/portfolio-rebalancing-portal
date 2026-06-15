import { Outlet, Link, useLocation } from 'react-router';
import { LayoutDashboard, Shield as ShieldIcon, ScrollText, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserMenu } from './UserMenu';

export function Layout() {
  const location = useLocation();
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  // Role-based navigation
  const navItems = user.role === 'Financial Advisor'
    ? [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/audit', label: 'Audit Trail', icon: ScrollText }
      ]
    : [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/compliance', label: 'Compliance Review', icon: ShieldIcon },
        { path: '/audit', label: 'Audit Trail', icon: ScrollText }
      ];

  return (
    <div className="size-full flex flex-col" style={{ backgroundColor: 'var(--color-background)', fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}>
        <div className="flex items-center justify-between px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-10" style={{ backgroundColor: 'var(--color-primary)' }}>
              <Shield className="size-6" style={{ color: 'var(--color-primary-foreground)' }} />
            </div>
            <div>
              <h1 style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 600 }}>
                TrustN
              </h1>
              <p className="text-sm" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}>
                Portfolio Rebalancing Platform
              </p>
            </div>
          </div>
          <UserMenu />
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}>
        <div className="flex gap-1 px-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-2 px-4 py-3 border-b-2 transition-colors"
                style={{
                  borderColor: isActive ? 'var(--color-primary)' : 'transparent',
                  color: isActive ? 'var(--color-primary)' : 'var(--color-muted-foreground)',
                  fontFamily: 'var(--font-body)'
                }}
              >
                <Icon className="size-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
