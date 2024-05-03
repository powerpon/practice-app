import { NavLink } from '@remix-run/react';
import styleLink from './Header.css?url';
import { LinksFunction } from '@remix-run/node';
import { navigation } from '../constants/constants';

export default function Header() {
  return (
    <header>
      <nav className="flex justify-evenly items-center bg-blue-300 h-12">
        <NavLink
          to={navigation.notesPage.uri}
          className={({ isActive }) =>
            `header-navigation-link ${isActive ? '!text-red-800' : ''}`
          }
        >
          {navigation.notesPage.label}
        </NavLink>
        <NavLink
          to={navigation.createNotePage.uri}
          className={({ isActive }) =>
            `header-navigation-link ${isActive ? '!text-red-800' : ''}`
          }
        >
          {navigation.createNotePage.label}
        </NavLink>
      </nav>
    </header>
  );
}

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styleLink },
];
