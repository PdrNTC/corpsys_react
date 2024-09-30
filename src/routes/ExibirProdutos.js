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

const GrupoProdutoLista = styled.ul`
  list-style: none;
  padding: 0;
`;

const GrupoProdutoItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #444;

  &:last-child {
    border-bottom: none;
  }
`;


const ExibirProdutos = () => {
  const [produto, setProduto] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/produtos/');
        setProduto(response.data);
      } catch (error) {
        console.error('Erro ao buscar os produtos:', error);
        alert('Erro ao buscar os produtos na API!')
      }
    };
    fetchClientes();
  }, []);

  return (
    <ListaWrapper>
        <ListaContainer>
            <ListaTitulo>Lista de Produtos</ListaTitulo>
            {produto.length > 0 ? (
                <GrupoProdutoLista>
                {produto.map((produto) => (
                    <GrupoProdutoItem key={produto.id}>
                    {produto.tipo_produto}
                    </GrupoProdutoItem>
                ))}
                </GrupoProdutoLista>
            ) : (
                <p>Nenhum produto cadastrado.</p>
            )}
        </ListaContainer>
    </ListaWrapper>
  );
};

export default ExibirProdutos;
