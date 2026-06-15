import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { AuthProvider } from '../context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './components/Login';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { PortfolioDetail } from './components/PortfolioDetail';
import { ProposalCreator } from './components/ProposalCreator';
import { ComplianceReview } from './components/ComplianceReview';
import { AuditTrail } from './components/AuditTrail';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="portfolio/:clientId" element={<PortfolioDetail />} />
            <Route path="proposal/:proposalId" element={<ProposalCreator />} />
            <Route path="proposal/new/:clientId" element={<ProposalCreator />} />
            <Route path="compliance" element={<ComplianceReview />} />
            <Route path="audit" element={<AuditTrail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}