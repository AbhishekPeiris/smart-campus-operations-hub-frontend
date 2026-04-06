import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getAllTickets } from '../../api/tickets';
import { getStatusBadge, getPriorityBadge, formatDate } from '../../utils/constants';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Spinner from '../../components/common/Spinner';
import { Ticket, AlertTriangle, CheckCircle, Clock, Plus } from 'lucide-react';

export default function UserDashboard() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllTickets(0, 100).then(res => {
      const mine = (res.data.data?.content || []).filter(t => t.createdByUserId === user.userId);
      setTickets(mine);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [user.userId]);

  const counts = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'OPEN').length,
    inProgress: tickets.filter(t => t.status === 'IN_PROGRESS').length,
    resolved: tickets.filter(t => t.status === 'RESOLVED' || t.status === 'CLOSED').length,
  };

  const stats = [
    { label: 'Total Tickets', value: counts.total, icon: Ticket, color: 'text-primary-600 bg-primary-50' },
    { label: 'Open', value: counts.open, icon: AlertTriangle, color: 'text-amber-600 bg-amber-50' },
    { label: 'In Progress', value: counts.inProgress, icon: Clock, color: 'text-blue-600 bg-blue-50' },
    { label: 'Resolved', value: counts.resolved, icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50' },
  ];

  if (loading) return <div className="flex justify-center py-20"><Spinner className="h-8 w-8" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-semibold text-text-primary">Welcome back, {user.fullName}</h1>
          <p className="text-sm text-text-muted mt-0.5">Here's an overview of your incident reports</p>
        </div>
        <Link to="/portal/new-ticket" className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700">
          <Plus size={16} /> Report Incident
        </Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map(s => (
          <Card key={s.label} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-text-muted">{s.label}</p>
                <p className="text-2xl font-semibold mt-1">{s.value}</p>
              </div>
              <div className={`p-2.5 rounded-lg ${s.color}`}><s.icon size={20} /></div>
            </div>
          </Card>
        ))}
      </div>
      <Card>
        <div className="px-4 py-3 border-b border-border">
          <h3 className="text-sm font-semibold">Recent Tickets</h3>
        </div>
        {tickets.length === 0 ? (
          <p className="p-8 text-center text-sm text-text-muted">No tickets yet. Report your first incident.</p>
        ) : (
          <div className="divide-y divide-border">
            {tickets.slice(0, 5).map(t => (
              <Link key={t.id} to={`/portal/tickets/${t.id}`} className="flex items-center justify-between px-4 py-3 hover:bg-surface-alt transition-colors">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">{t.ticketTitle}</p>
                  <p className="text-xs text-text-muted mt-0.5">{t.ticketCode} · {formatDate(t.createdAt)}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-4">
                  <Badge className={getPriorityBadge(t.priorityLevel).color}>{getPriorityBadge(t.priorityLevel).label}</Badge>
                  <Badge className={getStatusBadge(t.status).color}>{getStatusBadge(t.status).label}</Badge>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
