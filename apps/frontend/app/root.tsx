import apollo from "@apollo/client";
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
  const graphQLClient = new apollo.ApolloClient({
    ssrMode: true, 
    link: apollo.createHttpLink({ 
      uri: 'https://countries.trevorblades.com/graphql', 
      headers: {
        'Access-Control-Allow-Origin': '*', 
      },
    }),
    cache: new apollo.InMemoryCache(), 
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
        <apollo.ApolloProvider client={graphQLClient}>
          {children}
          <ScrollRestoration />
          <Scripts />
        </apollo.ApolloProvider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styleLink }
];

