import AdminPage from '../app/pages/AdminPage';
import SeoHead from '@/lib/SeoHead';

export default function Admin() {
  return (
    <>
      <SeoHead title="Admin | MyCyber Clinics" description="MyCyber Clinics administration console." canonicalPath="/admin" />
      <AdminPage />
    </>
  );
}
