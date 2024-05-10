import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core/index';
import { ApolloProvider } from '@apollo/client/react/context/ApolloProvider';
import { LinksFunction, MetaFunction } from '@remix-run/node';
import {
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import styleLink from '~/tailwind.css?url';
import {
  ERROR_PAGE_HOME_LINK_TEXT,
  ERROR_PAGE_TITLE_TEXT,
} from '@packages/ui-shared';

export const meta: MetaFunction = () => {
  return [{ title: 'Notes App' }];
};

export function Layout({ children }: { children: React.ReactNode }) {
  const graphQLClient = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: 'https://countries.trevorblades.com/graphql',
      headers: {
        'Access-Control-Allow-Origin': '*',
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

export function ErrorBoundary() {
  return (
    <main className="bg-red-400 wh-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold pb-4">{ERROR_PAGE_TITLE_TEXT}</h1>
      <NavLink className="text-xl text-blue-800" to="/">
        {ERROR_PAGE_HOME_LINK_TEXT}
      </NavLink>
    </main>
  );
}

export default function App() {
  return <Outlet />;
}

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styleLink },
];
