import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core/index";
import { ApolloProvider } from "@apollo/client/react/context/ApolloProvider";
import { LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styleLink from "~/tailwind.css?url";

export function Layout({ children }: { children: React.ReactNode }) {
  const graphQLClient = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: "https://countries.trevorblades.com/graphql",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }),
    cache: new InMemoryCache(),
  });

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ApolloProvider client={graphQLClient}>
          {children}
          <ScrollRestoration />
          <Scripts />
        </ApolloProvider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styleLink },
];
