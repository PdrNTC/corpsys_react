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


const ExibirGrupoProdutos = () => {
  const [grupoProduto, setGrupoProduto] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get('https://pedrohs.pythonanywhere.com/grupo-produtos/');
        setGrupoProduto(response.data);
      } catch (error) {
        console.error('Erro ao buscar os grupos de produtos:', error);
        alert('Erro ao buscar os grupos de produtos na API!')
      }
    };
    fetchClientes();
  }, []);

  const handleDelete = async (id) => {
    const confirmar = window.confirm('Tem certeza que deseja excluir este vendedor?');
    if (confirmar) {
      try {
        //await axios.delete(`http://localhost:8000/vendedores/${id}/`);
        await axios.delete(`https://pedrohs.pythonanywhere.com/grupo-produtos/${id}/`);
        setGrupoProduto(grupoProduto.filter(grupoProduto => grupoProduto.id !== id));
        alert('grupo de produto excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir Grupo produto:', error);
        alert('Erro ao excluir o grupo de produto.');
      }
    }
  };

  
  const handleEdit = (grupoProduto) => {
    alert(`Editar Grupo: ${grupoProduto.tipo_produto}`);
  };

  return (
    <ListaWrapper>
        <ListaContainer>
            <ListaTitulo>Lista de Grupo de Produtos</ListaTitulo>
            {grupoProduto.length > 0 ? (
                <GrupoProdutoLista>
                {grupoProduto.map((grupoProduto) => (
                    <GrupoProdutoItem key={grupoProduto.id}>
                      <div>
                        Tipo do produto: {grupoProduto.tipo_produto}
                      </div>
                      <AcoesContainer>
                        <BotaoAcao onClick={() => handleEdit(grupoProduto)}>Editar</BotaoAcao>
                        <BotaoAcao excluir onClick={() => handleDelete(grupoProduto.id)}>Excluir</BotaoAcao>
                      </AcoesContainer>
                    </GrupoProdutoItem>
                ))}
                </GrupoProdutoLista>
            ) : (
                <p>Nenhum grupo de produto cadastrado.</p>
            )}
            <BotaoVoltar />
        </ListaContainer>
    </ListaWrapper>
  );
};

export default ExibirGrupoProdutos;
