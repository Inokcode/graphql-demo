import logo from './logo.svg';
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:4000/graphql',
  });
  return (
    <ApolloClient client={client}>
      <div className="App"></div>
    </ApolloClient>
  );
}

export default App;
