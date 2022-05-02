import logo from "./logo.svg";
import "./App.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import TodoInput from "./components/TodoInput/TodoInput";
import Tasks from "./components/Tasks/Tasks";

function App() {
  const client = new ApolloClient({
    uri: "https://my-todo-app.hasura.app/v1/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>ToDo App</p>
        </header>
        <br />
        <TodoInput />
        <Tasks />
      </div>
    </ApolloProvider>
  );
}

export default App;
