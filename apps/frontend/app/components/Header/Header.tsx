import { NavLink } from '@remix-run/react';
import { navigation } from '../../constants/constants';

export default function Header() {
  return (
    <header>
      <nav className="flex justify-evenly items-center bg-blue-300 h-12">
        {Object.keys(navigation)
          .filter((key) => navigation[key].isNavbarItem)
          .map((key) => (
            <NavLink
              key={key}
              to={navigation[key].uri}
              className={({ isActive }) =>
                `text-orange-200 hover:text-red-400 ${isActive ? '!text-red-800' : ''}`
              }
            >
              {navigation[key].label}
            </NavLink>
          ))}
      </nav>
    </header>
  );
}
