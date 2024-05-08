import { Outlet } from '@remix-run/react';
import { Header } from '~/components';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Outlet />
    </div>
  );
}
