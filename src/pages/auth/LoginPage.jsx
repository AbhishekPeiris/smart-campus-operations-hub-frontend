import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { login } from '../../api/auth';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { GraduationCap } from 'lucide-react';

export default function LoginPage() {
  const [form, setForm] = useState({ universityEmailAddress: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await login(form);
      const data = res.data.data;
      loginUser(data);
      if (data.role === 'USER') navigate('/portal');
      else navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <GraduationCap size={24} className="text-white" />
          </div>
          <h1 className="text-xl font-semibold text-text-primary">Smart Campus</h1>
          <p className="text-sm text-text-muted mt-1">Operations Hub</p>
        </div>
        <div className="bg-white border border-border rounded-lg p-6">
          <h2 className="text-base font-semibold text-text-primary mb-4">Sign in</h2>
          {error && <div className="mb-4 p-2.5 bg-red-50 border border-red-200 rounded text-xs text-danger">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input label="University Email" type="email" required value={form.universityEmailAddress}
              onChange={e => setForm({ ...form, universityEmailAddress: e.target.value })} placeholder="you@uni.com" />
            <Input label="Password" type="password" required value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })} placeholder="••••••" />
            <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</Button>
          </form>
          <p className="mt-4 text-xs text-center text-text-muted">
            Don't have an account? <Link to="/register" className="text-primary-600 hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
