import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
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
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }
`;

const AcoesContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const BotaoAcao = styled.button`
  background-color: ${(props) => (props.excluir ? '#ff5252' : '#4caf50')};
  border: none;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.excluir ? '#ff0000' : '#388e3c')};
  }
`;

const ExibirVendedores = () => {
  const [vendedores, setVendedores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVendedores = async () => {
      try {
        const response = await axios.get('http://localhost:8000/vendedores/');
        setVendedores(response.data);
      } catch (error) {
        console.error('Erro ao buscar vendedores:', error);
        alert('Erro ao buscar os vendedores na API!')
      }
    };
    fetchVendedores();
  }, []);

  const handleDelete = async (id) => {
    const confirmar = window.confirm('Tem certeza que deseja excluir este vendedor?');
    if (confirmar) {
      try {
        await axios.delete(`http://localhost:8000/vendedores/${id}/`);
        setVendedores(vendedores.filter(vendedor => vendedor.id !== id));
        alert('Vendedor excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir vendedor:', error);
        alert('Erro ao excluir o vendedor.');
      }
    }
  };

  const handleEdit = (id) => {
    // Redirecionar para a página de edição do vendedor
    navigate(`/vendedores/${id}`);
  };

  return (
    <ListaWrapper>
      <ListaContainer>
        <ListaTitulo>Lista de Vendedores</ListaTitulo>
        {vendedores.length > 0 ? (
          <VendedorLista>
            {vendedores.map((vendedor) => (
              <VendedorItem key={vendedor.id}>
                <div>
                  Nome: {vendedor.nome} - Email: {vendedor.email}
                </div>
                <AcoesContainer>
                  <BotaoAcao onClick={() => handleEdit(vendedor.id)}>Editar</BotaoAcao>
                  <BotaoAcao excluir onClick={() => handleDelete(vendedor.id)}>Excluir</BotaoAcao>
                </AcoesContainer>
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
