import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log("graphQLErrors", graphQLErrors);
  }
  if (networkError) {
    console.log("networkError", networkError);
  }
});

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
});

const link = ApolloLink.from([errorLink, httpLink]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);
