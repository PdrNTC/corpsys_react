import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import BotaoVoltar from '../components/BotaoVoltar';

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

const VendedorLista = styled.ul`
  list-style: none;
  padding: 0;
`;

const VendedorItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #444;

  &:last-child {
    border-bottom: none;
  }
`;


const ExibirVendedores = () => {
  const [vendedor, setVendedor] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/vendedores/');
        setVendedor(response.data);
      } catch (error) {
        console.error('Erro ao buscar vendedores:', error);
        alert('Erro ao buscar os vendedores na API!')
      }
    };
    fetchClientes();
  }, []);

  return (
    <ListaWrapper>
        <ListaContainer>
            <ListaTitulo>Lista de Vendedores</ListaTitulo>
            {vendedor.length > 0 ? (
                <VendedorLista>
                {vendedor.map((vendedor) => (
                    <VendedorItem key={vendedor.id}>
                    Nome: {vendedor.nome} - Email: {vendedor.email}
                    </VendedorItem>
                ))}
                </VendedorLista>
            ) : (
                <p>Nenhum vendedor cadastrado.</p>
            )}
            <BotaoVoltar />
        </ListaContainer>
    </ListaWrapper>
  );
};

export default ExibirVendedores;
