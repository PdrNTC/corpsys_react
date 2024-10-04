import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import BotaoVoltar from '../components/BotaoVoltar';

const EditarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #1a1a1a;
`;

const EditarContainer = styled.div`
  background-color: #333;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  color: #fff;
  width: 600px;
`;

const EditarTitulo = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #ff5252;
`;

function EditarCliente () {
  const { id } = useParams(); // Pegando o ID da URL
  const navigate = useNavigate();
  const [cliente, setCliente] = useState({
    nome: '',
    email: '',
  });

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get(`https://pedrohs.pythonanywhere.com/clientes/${id}/`);
        setCliente(response.data);
      } catch (error) {
        console.error('Erro ao buscar vendedor:', error);
        alert('Erro ao buscar os dados do vendedor na API.');
      }
    };
    fetchClientes();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente({
      ...cliente,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/clientes/${id}/`, cliente);
      alert('Vendedor atualizado com sucesso!');
      navigate('/clientes');
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      alert('Erro ao atualizar os dados do cliente.');
    }
  };

  return (
    <EditarWrapper>
      <EditarContainer>
        <EditarTitulo>Editar Vendedor</EditarTitulo>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              name="nome"
              value={cliente.nome}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={cliente.email}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Salvar Alterações</button>
        </form>
        <BotaoVoltar />
      </EditarContainer>
    </EditarWrapper>
  );
};

export default EditarCliente;
