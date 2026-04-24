import { cookies } from 'next/headers';
import AdminLogin from '@/components/AdminLogin';
import AdminDashboard from '@/components/AdminDashboard';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Admin Panel — Airdus Remote',
  robots: 'noindex, nofollow',
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('admin_auth');
  const isAuthenticated = authCookie?.value === process.env.ADMIN_PASSWORD;

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return <AdminDashboard />;
}
