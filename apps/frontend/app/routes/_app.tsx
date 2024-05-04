import { LinksFunction } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import { links as HeaderStyleLinks } from '~/components/Header/Header';
import { Header } from '~/components';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Outlet />
    </div>
  );
}

export const links: LinksFunction = () => [...HeaderStyleLinks()];
