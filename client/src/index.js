import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { ApolloProvider } from "@apollo/client";
import client from './apollo'

import {
  BrowserRouter
} from "react-router-dom";

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
