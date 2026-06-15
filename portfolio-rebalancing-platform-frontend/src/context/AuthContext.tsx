import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'Financial Advisor' | 'Compliance Officer';

export interface User {
  userId: string;
  fullName: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database
const MOCK_USERS: Record<string, { user: User; password: string }> = {
  'neo.p@trustn.com': {
    user: {
      userId: 'ADV-001',
      fullName: 'Neo P',
      email: 'neo.p@trustn.com',
      role: 'Financial Advisor'
    },
    password: 'password'
  },
  'jerry.c@trustn.com': {
    user: {
      userId: 'COMP-001',
      fullName: 'Jerry C',
      email: 'jerry.c@trustn.com',
      role: 'Compliance Officer'
    },
    password: 'password'
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    const userRecord = MOCK_USERS[email.toLowerCase()];

    if (userRecord && userRecord.password === password) {
      setUser(userRecord.user);
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Role-based access control
export function canAccessRoute(user: User | null, route: string): boolean {
  if (!user) return false;

  const rolePermissions: Record<UserRole, string[]> = {
    'Financial Advisor': [
      '/dashboard',
      '/portfolio',
      '/proposal',
      '/audit'  // Own audit trail only
    ],
    'Compliance Officer': [
      '/dashboard',
      '/compliance',
      '/audit',  // Full audit trail
      '/proposal'  // View-only proposal access
    ]
  };

  const permissions = rolePermissions[user.role] || [];

  return permissions.some(permission => route.startsWith(permission));
}
