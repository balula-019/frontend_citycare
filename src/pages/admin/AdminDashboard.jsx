// import { Link } from 'react-router-dom';
// import Button from '../../components/shared/Button';

// export default function AdminDashboard() {
//   return (
//     <div className="max-w-7xl mx-auto p-8">
//       <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//         <div className="bg-white p-6 rounded-2xl shadow-sm border">
//           <h3 className="text-lg font-medium">Total Users</h3>
//           <p className="text-3xl font-bold text-primary">120</p>
//         </div>
//         <div className="bg-white p-6 rounded-2xl shadow-sm border">
//           <h3 className="text-lg font-medium">Organizations</h3>
//           <p className="text-3xl font-bold text-secondary">15</p>
//         </div>
//         <div className="bg-white p-6 rounded-2xl shadow-sm border">
//           <h3 className="text-lg font-medium">Items Recovered</h3>
//           <p className="text-3xl font-bold text-success">84%</p>
//         </div>
//       </div>
//       <div className="flex gap-4">
//         <Link to="/admin/create-org"><Button variant="primary">Create Organisation</Button></Link>
//         <Link to="/admin/manage-users"><Button variant="outline">Manage Users</Button></Link>
//       </div>
//     </div>
//   );
// }

import { Link } from 'react-router-dom';
import Button from '../../components/shared/Button';
import { useAuth } from '../../context/AuthContext';

export default function AdminDashboard() {
  const { logoutUser } = useAuth();

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h3 className="text-lg font-medium">Total Users</h3>
          <p className="text-3xl font-bold text-primary">120</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h3 className="text-lg font-medium">Organizations</h3>
          <p className="text-3xl font-bold text-secondary">15</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h3 className="text-lg font-medium">Items Recovered</h3>
          <p className="text-3xl font-bold text-success">84%</p>
        </div>
      </div>
      <div className="flex gap-4 flex-wrap">
        <Link to="/admin/create-org">
          <Button variant="primary">Create Organisation</Button>
        </Link>
        <Link to="/admin/manage-users">
          <Button variant="outline">Manage Users</Button>
        </Link>
      </div>
      <div className="mt-8">
        <Button variant="ghost" onClick={() => { logoutUser(); window.location.hash = '#/login'; }}>
          Log Out
        </Button>
      </div>
    </div>
  );
}