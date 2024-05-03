import { LinksFunction, MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import Header, { links as HeaderStyleLinks } from "~/components/Header/Header";

export const meta: MetaFunction = () => {
  return [{ title: "Notes App" }];
};

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Outlet />
    </div>
  );
}

export const links: LinksFunction = () => [...HeaderStyleLinks()];
