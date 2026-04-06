import { useState, useEffect } from 'react';
import { getAllUsers, updateUserStatus } from '../../api/users';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Spinner from '../../components/common/Spinner';
import Pagination from '../../components/common/Pagination';
import { formatDate } from '../../utils/constants';
import { UserCheck, UserX } from 'lucide-react';

export default function UserManagement() {
  const [data, setData] = useState({ content: [], totalPages: 0, currentPage: 0 });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  const load = (p) => {
    setLoading(true);
    getAllUsers(p, 15).then(res => setData(res.data.data || { content: [] })).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { load(page); }, [page]);

  const toggleStatus = async (userId, currentEnabled) => {
    try {
      await updateUserStatus(userId, !currentEnabled);
      load(page);
    } catch {}
  };

  const roleBadge = (role) => {
    const map = { ADMIN: 'bg-violet-100 text-violet-700', TECHNICIAN: 'bg-blue-100 text-blue-700', USER: 'bg-slate-100 text-slate-600' };
    return map[role] || map.USER;
  };

  return (
    <div>
      <h1 className="text-lg font-semibold mb-5">User Management</h1>
      <Card>
        {loading ? <div className="flex justify-center py-16"><Spinner className="h-8 w-8" /></div> : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-alt text-xs text-text-muted">
                    <th className="text-left px-4 py-2 font-medium">Name</th>
                    <th className="text-left px-4 py-2 font-medium">Email</th>
                    <th className="text-left px-4 py-2 font-medium">Role</th>
                    <th className="text-left px-4 py-2 font-medium">Status</th>
                    <th className="text-left px-4 py-2 font-medium">Joined</th>
                    <th className="text-left px-4 py-2 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {(data.content || []).map(u => (
                    <tr key={u.id} className="hover:bg-surface-alt/50">
                      <td className="px-4 py-2.5 font-medium">{u.fullName}</td>
                      <td className="px-4 py-2.5 text-xs text-text-muted">{u.universityEmailAddress}</td>
                      <td className="px-4 py-2.5"><Badge className={roleBadge(u.role)}>{u.role}</Badge></td>
                      <td className="px-4 py-2.5">
                        <Badge className={u.accountEnabled !== false ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}>
                          {u.accountEnabled !== false ? 'Active' : 'Disabled'}
                        </Badge>
                      </td>
                      <td className="px-4 py-2.5 text-xs text-text-muted">{formatDate(u.createdAt)}</td>
                      <td className="px-4 py-2.5">
                        <Button size="sm" variant={u.accountEnabled !== false ? 'danger' : 'success'}
                          onClick={() => toggleStatus(u.id, u.accountEnabled !== false)}>
                          {u.accountEnabled !== false ? <><UserX size={13} className="mr-1" />Disable</> : <><UserCheck size={13} className="mr-1" />Enable</>}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 pb-3">
              <Pagination currentPage={data.currentPage || 0} totalPages={data.totalPages || 0} onPageChange={setPage} />
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
