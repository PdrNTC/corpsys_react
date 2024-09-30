import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ListaWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #1a1a1a;
`;

const ListaContainer = styled.div`
  background-color: #333;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  color: #fff;
  width: 600px;
`;

const ListaTitulo = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #ff5252;
`;

const ClienteLista = styled.ul`
  list-style: none;
  padding: 0;
`;

const ClienteItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #444;

  &:last-child {
    border-bottom: none;
  }
`;


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
    <ListaWrapper>
        <ListaContainer>
            <ListaTitulo>Lista de Clientes</ListaTitulo>
            {clientes.length > 0 ? (
                <ClienteLista>
                {clientes.map((cliente) => (
                    <ClienteItem key={cliente.id}>
                    {cliente.nome} - {cliente.email} - {cliente.telefone}
                    </ClienteItem>
                ))}
                </ClienteLista>
            ) : (
                <p>Nenhum cliente cadastrado.</p>
            )}
        </ListaContainer>
    </ListaWrapper>
  );
};

export default ExibirClientes;
