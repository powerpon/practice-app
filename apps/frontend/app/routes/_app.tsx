import { LinksFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import Header, {links as HeaderStyleLinks} from "~/components/Header/Header";

export default function Layout() {
    return (
      <div className="flex flex-col h-screen">
        <Header />
        <Outlet />
      </div>
    )
}

export const links: LinksFunction = () => [
...HeaderStyleLinks(),
];
