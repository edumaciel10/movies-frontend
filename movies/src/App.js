import React from 'react';
import './App.css';
import fetchGraphQL from './fetchGraphQL';
import graphql from 'babel-plugin-relay/macro';
import {
  RelayEnvironmentProvider,
  loadQuery,
  usePreloadedQuery,
} from 'react-relay/hooks';
import RelayEnvironment from './RelayEnvironment';

const { Suspense } = React;

const getMoviesQuery = graphql`
  query GetMoviesQuery { 
    movies {
      name,
    }
  }
`
const preloadedQuery = loadQuery(RelayEnvironment, getMoviesQuery, {
  /* query variables */
});
function App(props) {
  const data = usePreloadedQuery(getMoviesQuery, props.preloadedQuery);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          {
            data.movies != null ? data.movies.map((value) => `Filme: ${value.name}`) : "Without name"
          }
        </p>
      </header>
    </div>
  );
}
function AppRoot(props) {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Suspense fallback={'Loading...'}>
        <App preloadedQuery={preloadedQuery} />
      </Suspense>
    </RelayEnvironmentProvider>
  );
}

export default AppRoot;