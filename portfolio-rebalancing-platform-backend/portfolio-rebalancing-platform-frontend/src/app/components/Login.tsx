import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Shield, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = login(email, password);

    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-muted)' }}>
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center size-16 mb-4" style={{ backgroundColor: 'var(--color-primary)' }}>
            <Shield className="size-9" style={{ color: 'var(--color-primary-foreground)' }} />
          </div>
          <h1 className="text-3xl mb-2" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
            TrustN
          </h1>
          <p style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}>
            Portfolio Rebalancing Platform
          </p>
        </div>

        {/* Login Card */}
        <div className="border p-8" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}>
          <h2 className="text-xl mb-6" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-heading)' }}>
            Sign In
          </h2>

          {error && (
            <div className="mb-4 p-3 border flex items-center gap-2" style={{ backgroundColor: '#FFF4E5', borderColor: 'var(--color-warning)', color: 'var(--color-warning-foreground)' }}>
              <AlertCircle className="size-4 flex-shrink-0" />
              <span className="text-sm" style={{ fontFamily: 'var(--font-body)' }}>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-body)' }}>
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border"
                style={{
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-input-background)',
                  color: 'var(--color-foreground)',
                  fontFamily: 'var(--font-body)'
                }}
                placeholder="you@trustn.com"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block mb-2" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-body)' }}>
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border"
                style={{
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-input-background)',
                  color: 'var(--color-foreground)',
                  fontFamily: 'var(--font-body)'
                }}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 transition-opacity hover:opacity-90"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-primary-foreground)',
                fontFamily: 'var(--font-body)'
              }}
            >
              Sign In
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
            <p className="text-sm mb-3" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}>
              Demo Credentials:
            </p>
            <div className="space-y-2 text-xs" style={{ fontFamily: 'var(--font-body)' }}>
              <div className="p-2" style={{ backgroundColor: 'var(--color-muted)' }}>
                <p className="font-medium mb-1" style={{ color: 'var(--color-foreground)' }}>Financial Advisor</p>
                <p style={{ color: 'var(--color-muted-foreground)' }}>Email: neo.p@trustn.com</p>
                <p style={{ color: 'var(--color-muted-foreground)' }}>Password: password</p>
              </div>
              <div className="p-2" style={{ backgroundColor: 'var(--color-muted)' }}>
                <p className="font-medium mb-1" style={{ color: 'var(--color-foreground)' }}>Compliance Officer</p>
                <p style={{ color: 'var(--color-muted-foreground)' }}>Email: jerry.c@trustn.com</p>
                <p style={{ color: 'var(--color-muted-foreground)' }}>Password: password</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}>
          <p>© 2026 TrustN. All rights reserved.</p>
          <p className="mt-1">Confidential - Internal Use Only</p>
        </div>
      </div>
    </div>
  );
}
