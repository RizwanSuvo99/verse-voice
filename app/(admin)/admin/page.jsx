'use client';

import AdminLayout from './AdminLayout';
import CreateBlog from './create-blog/CreateBlog';

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <CreateBlog />
    </AdminLayout>
  );
};

export default AdminDashboard;
