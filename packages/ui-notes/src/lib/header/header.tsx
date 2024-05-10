import { RemixNavLinkWrapper } from 'ui-link';
import { navigation } from 'ui-shared';

export default function Header() {
    return (
        <header>
          <nav className="flex justify-evenly items bg-blue-500">
            {Object.keys(navigation)
              .filter((key) => navigation[key].isNavbarItem)
              .map((key) => (
                <RemixNavLinkWrapper
                  key={key}
                  to={navigation[key].uri}
                  className={({ isActive }) =>
                    `text-orange-200 hover:text-red-400 ${isActive ? '!text-red-800' : ''}`
                  }
                >
                  {navigation[key].label}
                </RemixNavLinkWrapper>
              ))}
          </nav>
        </header>
    );
}
