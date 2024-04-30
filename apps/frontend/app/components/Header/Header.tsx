import { NavLink } from "@remix-run/react";
import styleLink from './Header.css?url';
import { LinksFunction } from "@remix-run/node";

export default function Header(){
    return (
        <header>
            <nav className="flex justify-evenly items-center bg-blue-300 h-12">
                <NavLink to="/" className={
                        ({isActive}) => isActive ? 
                            "header-navigation-link !text-red-800" : "header-navigation-link"
                    }>Notes</NavLink>
                <NavLink to="/note/create" className={
                        ({isActive}) => isActive ? 
                            "header-navigation-link !text-red-800" : "header-navigation-link"
                    }>Create Note</NavLink>
            </nav>
        </header>
    );
}

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: styleLink }
  ];