import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import BotaoVoltar from '../components/BotaoVoltar';
import { useNavigate } from 'react-router-dom';

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


const ExibirClientes = () => {
  const [clientes, setClientes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        //const response = await axios.get('http://localhost:8000/clientes/');
        const response = await axios.get('https://pedrohs.pythonanywhere.com/clientes/'); // API DEPLOY - PythonAnywhere
        setClientes(response.data);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        alert('Erro ao buscar os clientes na API!')
      }
    };
    fetchClientes();
  }, []);

  const handleDelete = async (id) => {
    const confirmar = window.confirm('Tem certeza que deseja excluir este vendedor?');
    if (confirmar) {
      try {
        await axios.delete(`http://localhost:8000/clientes/${id}/`);
        setClientes(clientes.filter(cliente => cliente.id !== id));
        alert('Cliente excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir Cliente:', error);
        alert('Erro ao excluir o Cliente.');
      }
    }
  };

  const handleEdit = (id) => {
    // Redirecionar para a página de edição do Cliente
    navigate(`/clientes/${id}`);
  };


  return (
    <ListaWrapper>
        <ListaContainer>
            <ListaTitulo>Lista de Clientes</ListaTitulo>
            {clientes.length > 0 ? (
                <ClienteLista>
                {clientes.map((cliente) => (
                    <ClienteItem key={cliente.id}>
                      <div>
                        Nome: {cliente.nome} - Email: {cliente.email} - Telefone: {cliente.telefone}
                      </div>
                      <AcoesContainer>
                        <BotaoAcao onClick={() => handleEdit(cliente.id)}>Editar</BotaoAcao>
                        <BotaoAcao excluir onClick={() => handleDelete(cliente.id)}>Excluir</BotaoAcao>
                      </AcoesContainer>
                    </ClienteItem>
                ))}
                </ClienteLista>
            ) : (
                <p>Nenhum cliente cadastrado.</p>
            )}
            <BotaoVoltar />
        </ListaContainer>
    </ListaWrapper>
  );
};

export default ExibirClientes;
