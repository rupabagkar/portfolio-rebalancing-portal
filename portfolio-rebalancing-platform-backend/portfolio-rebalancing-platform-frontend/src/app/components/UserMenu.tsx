import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { User, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  // Get initials for avatar
  const initials = user.fullName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-3 py-2 border transition-colors hover:bg-opacity-5"
        style={{
          borderColor: 'var(--color-border)',
          backgroundColor: 'transparent',
          fontFamily: 'var(--font-body)'
        }}
      >
        <div className="flex items-center gap-3">
          {/* Avatar with initials */}
          <div
            className="flex items-center justify-center size-9"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-primary-foreground)',
              fontFamily: 'var(--font-body)',
              fontWeight: 'var(--font-weight-medium)',
              fontSize: 'var(--text-sm)'
            }}
          >
            {initials}
          </div>

          {/* User info */}
          <div className="text-left hidden md:block">
            <p className="text-sm font-medium" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-body)' }}>
              {user.fullName}
            </p>
            <p className="text-xs" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}>
              {user.role}
            </p>
          </div>

          <ChevronDown
            className={`size-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            style={{ color: 'var(--color-muted-foreground)' }}
          />
        </div>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-64 border shadow-lg z-50"
          style={{
            backgroundColor: 'var(--color-card)',
            borderColor: 'var(--color-border)'
          }}
        >
          {/* User info in dropdown */}
          <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
            <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-body)' }}>
              {user.fullName}
            </p>
            <p className="text-xs" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}>
              {user.email}
            </p>
            <div className="mt-2 px-2 py-1 inline-block text-xs" style={{ backgroundColor: 'var(--color-muted)', color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}>
              {user.role}
            </div>
          </div>

          {/* Menu items */}
          <div className="py-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors"
              style={{
                color: 'var(--color-foreground)',
                fontFamily: 'var(--font-body)',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-muted)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <LogOut className="size-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
