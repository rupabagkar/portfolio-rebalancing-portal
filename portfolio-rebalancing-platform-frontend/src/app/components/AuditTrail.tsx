import { useState, useMemo } from 'react';
import { Download, Search, Filter, Calendar } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockAuditLog, type AuditLogEntry } from '../../data/mockData';

export function AuditTrail() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [actionTypeFilter, setActionTypeFilter] = useState<string>('All');
  const [userRoleFilter, setUserRoleFilter] = useState<string>('All');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Get unique action types and roles for filters
  const actionTypes = useMemo(() => {
    return Array.from(new Set(mockAuditLog.map(log => log.actionType)));
  }, []);

  const userRoles = useMemo(() => {
    return Array.from(new Set(mockAuditLog.map(log => log.userRole)));
  }, []);

  // Filter and search audit log
  const filteredLogs = useMemo(() => {
    // Filter by user for Financial Advisors (only see their own actions)
    let filtered = user?.role === 'Financial Advisor'
      ? mockAuditLog.filter(log => log.userId === user.userId)
      : mockAuditLog;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(log =>
        log.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.entityId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.actionType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Action type filter
    if (actionTypeFilter !== 'All') {
      filtered = filtered.filter(log => log.actionType === actionTypeFilter);
    }

    // User role filter
    if (userRoleFilter !== 'All') {
      filtered = filtered.filter(log => log.userRole === userRoleFilter);
    }

    // Date range filter
    if (dateFrom) {
      const fromDate = new Date(dateFrom);
      filtered = filtered.filter(log => new Date(log.timestampUtc) >= fromDate);
    }

    if (dateTo) {
      const toDate = new Date(dateTo);
      toDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter(log => new Date(log.timestampUtc) <= toDate);
    }

    // Sort by timestamp, most recent first
    return filtered.sort((a, b) =>
      new Date(b.timestampUtc).getTime() - new Date(a.timestampUtc).getTime()
    );
  }, [searchTerm, actionTypeFilter, userRoleFilter, dateFrom, dateTo, user]);

  const handleExportCSV = () => {
    const headers = [
      'Timestamp (UTC)',
      'User ID',
      'User Role',
      'Action Type',
      'Entity Type',
      'Entity ID',
      'Previous State',
      'New State',
      'Source IP',
      'Session ID'
    ];

    const rows = filteredLogs.map(log => [
      log.timestampUtc,
      log.userId,
      log.userRole,
      log.actionType,
      log.entityType,
      log.entityId,
      log.previousState || '',
      log.newState || '',
      log.sourceIp,
      log.sessionId
    ]);

    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit_trail_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setActionTypeFilter('All');
    setUserRoleFilter('All');
    setDateFrom('');
    setDateTo('');
  };

  const getActionBadge = (actionType: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      'LOGIN': { bg: '#e0f2fe', text: '#0369a1' },
      'PROPOSAL_CREATE': { bg: '#ddd6fe', text: '#5b21b6' },
      'PROPOSAL_SUBMIT': { bg: '#fef3c7', text: '#92400e' },
      'PROPOSAL_APPROVE': { bg: '#dcfce7', text: '#166534' },
      'PROPOSAL_REJECT': { bg: '#fee2e2', text: '#991b1b' }
    };

    const color = colors[actionType] || { bg: 'var(--color-muted)', text: 'var(--color-muted-foreground)' };

    return (
      <span
        className="px-2 py-1 rounded text-xs font-medium"
        style={{ backgroundColor: color.bg, color: color.text }}
      >
        {actionType.replace(/_/g, ' ')}
      </span>
    );
  };

  const formatTimestamp = (utcTimestamp: string) => {
    const date = new Date(utcTimestamp);
    return {
      utc: date.toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      local: date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    };
  };

  const hasActiveFilters = searchTerm || actionTypeFilter !== 'All' || userRoleFilter !== 'All' || dateFrom || dateTo;

  return (
    <div className="p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-medium mb-1" style={{ color: 'var(--color-foreground)' }}>
              Audit Trail
            </h1>
            <p className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
              Complete immutable log of all system actions
            </p>
          </div>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 rounded-lg"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-primary-foreground)'
            }}
          >
            <Download className="size-4" />
            Export CSV
          </button>
        </div>

        {/* Filters */}
        <div className="rounded-lg border p-4 mb-6" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}>
          <div className="flex items-center gap-2 mb-4">
            <Filter className="size-4" style={{ color: 'var(--color-muted-foreground)' }} />
            <h3 className="font-medium" style={{ color: 'var(--color-foreground)' }}>Filters</h3>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="ml-auto text-sm hover:underline"
                style={{ color: 'var(--color-primary)' }}
              >
                Clear all filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Search */}
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-foreground)' }}>
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4" style={{ color: 'var(--color-muted-foreground)' }} />
                <input
                  type="text"
                  placeholder="Search by user ID, entity ID, or action..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border"
                  style={{
                    borderColor: 'var(--color-border)',
                    backgroundColor: 'var(--color-input-background)',
                    color: 'var(--color-foreground)'
                  }}
                />
              </div>
            </div>

            {/* Action Type */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-foreground)' }}>
                Action Type
              </label>
              <select
                value={actionTypeFilter}
                onChange={(e) => setActionTypeFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border"
                style={{
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-input-background)',
                  color: 'var(--color-foreground)'
                }}
              >
                <option value="All">All Actions</option>
                {actionTypes.map(type => (
                  <option key={type} value={type}>{type.replace(/_/g, ' ')}</option>
                ))}
              </select>
            </div>

            {/* User Role */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-foreground)' }}>
                User Role
              </label>
              <select
                value={userRoleFilter}
                onChange={(e) => setUserRoleFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border"
                style={{
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-input-background)',
                  color: 'var(--color-foreground)'
                }}
              >
                <option value="All">All Roles</option>
                {userRoles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-foreground)' }}>
                Date From
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4" style={{ color: 'var(--color-muted-foreground)' }} />
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border"
                  style={{
                    borderColor: 'var(--color-border)',
                    backgroundColor: 'var(--color-input-background)',
                    color: 'var(--color-foreground)'
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-foreground)' }}>
                Date To
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4" style={{ color: 'var(--color-muted-foreground)' }} />
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border"
                  style={{
                    borderColor: 'var(--color-border)',
                    backgroundColor: 'var(--color-input-background)',
                    color: 'var(--color-foreground)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
            Showing {filteredLogs.length} of {mockAuditLog.length} entries
          </p>
        </div>

        {/* Audit Log Table */}
        <div className="rounded-lg border overflow-hidden" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: 'var(--color-muted)' }}>
                  <th className="text-left px-4 py-3 text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>
                    Timestamp
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>
                    User
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>
                    Action
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>
                    Entity
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>
                    State Change
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>
                    Source IP
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log) => {
                  const timestamp = formatTimestamp(log.timestampUtc);

                  return (
                    <tr
                      key={log.logId}
                      className="border-t"
                      style={{ borderColor: 'var(--color-border)' }}
                    >
                      <td className="px-4 py-3">
                        <div className="text-sm">
                          <p style={{ color: 'var(--color-foreground)' }}>{timestamp.local}</p>
                          <p className="text-xs font-mono" style={{ color: 'var(--color-muted-foreground)' }}>
                            {timestamp.utc}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm">
                          <p className="font-medium" style={{ color: 'var(--color-foreground)' }}>{log.userId}</p>
                          <p className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>{log.userRole}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {getActionBadge(log.actionType)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm">
                          <p style={{ color: 'var(--color-foreground)' }}>{log.entityType}</p>
                          <p className="text-xs font-mono" style={{ color: 'var(--color-muted-foreground)' }}>{log.entityId}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm">
                          {log.previousState && (
                            <div className="flex items-center gap-2">
                              <span style={{ color: 'var(--color-muted-foreground)' }}>{log.previousState}</span>
                              <span style={{ color: 'var(--color-muted-foreground)' }}>→</span>
                              <span className="font-medium" style={{ color: 'var(--color-foreground)' }}>{log.newState}</span>
                            </div>
                          )}
                          {log.newState && !log.previousState && (
                            <span className="font-medium" style={{ color: 'var(--color-foreground)' }}>{log.newState}</span>
                          )}
                          {!log.newState && !log.previousState && (
                            <span style={{ color: 'var(--color-muted-foreground)' }}>-</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm font-mono" style={{ color: 'var(--color-muted-foreground)' }}>
                          {log.sourceIp}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredLogs.length === 0 && (
            <div className="p-8 text-center" style={{ color: 'var(--color-muted-foreground)' }}>
              No audit log entries found
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="mt-4 p-4" style={{ backgroundColor: 'var(--color-muted)' }}>
          <p className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
            <strong style={{ color: 'var(--color-foreground)' }}>Note:</strong> The audit trail is read-only and immutable.
            All entries are retained for 7 years to meet regulatory requirements. Timestamps are shown in both UTC and local time.
            {user?.role === 'Financial Advisor' && ' Financial Advisors can only view their own audit trail entries.'}
          </p>
        </div>
      </div>
    </div>
  );
}
