// src/pages/ExibirClientes.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExibirClientes = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/clientes/');
        setClientes(response.data);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        alert('Erro ao buscar os clientes na API!')
      }
    };
    fetchClientes();
  }, []);

  return (
    <div>
        <h2>Lista de Clientes</h2>
        {clientes.length > 0 ? (
            <ul>
            {clientes.map((cliente) => (
                <li key={cliente.id}>
                {cliente.nome} - {cliente.email} - {cliente.telefone}
                </li>
            ))}
            </ul>
        ) : (
            <p>Nenhum cliente cadastrado.</p>
        )}
    </div>
  );
};

export default ExibirClientes;
