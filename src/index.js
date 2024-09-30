import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createGlobalStyle } from 'styled-components';
import Home from './routes/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CadastrarCliente from './routes/CadastrarCliente';
import ExibirClientes from './routes/ExibirClientes';
import ExibirVendedores from './routes/ExibirVendedores';
import CadastrarVendedores from './routes/CadastrarVendedores';

const GlobalStyle = createGlobalStyle `
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  li {
    list-style: none;
  }
`

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <BrowserRouter>
      <Routes>
        <Route path="/cadastrar-cliente" element={<CadastrarCliente/>} />
        <Route path="/exibir-clientes" element={<ExibirClientes/>} />
        <Route path="/exibir-vendedores" element={<ExibirVendedores/>} />
        <Route path="/cadastrar-vendedor" element={<CadastrarVendedores/>} />
        <Route path="" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
