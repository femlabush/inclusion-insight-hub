import { useAuth } from '../contexts/AuthContext';
import { AdminDashboard } from './admin/AdminDashboard';
import { AnalystDashboard } from './analyst/AnalystDashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (user?.role === 'admin') {
    return <AdminDashboard />;
  }

  if (user?.role === 'analyst') {
    return <AnalystDashboard />;
  }

  return null;
};

export default Dashboard;