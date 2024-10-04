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

function EditarVendedor () {
  const { id } = useParams(); // Pegando o ID da URL
  const navigate = useNavigate();
  const [vendedor, setVendedor] = useState({
    nome: '',
    email: '',
  });

  useEffect(() => {
    const fetchVendedor = async () => {
      try {
        const response = await axios.get(`https://pedrohs.pythonanywhere.com/vendedores/${id}/`);
        setVendedor(response.data);
      } catch (error) {
        console.error('Erro ao buscar vendedor:', error);
        alert('Erro ao buscar os dados do vendedor na API.');
      }
    };
    fetchVendedor();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendedor({
      ...vendedor,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/vendedores/${id}/`, vendedor);
      alert('Vendedor atualizado com sucesso!');
      navigate('/vendedores'); // Redireciona para a lista de vendedores
    } catch (error) {
      console.error('Erro ao atualizar vendedor:', error);
      alert('Erro ao atualizar os dados do vendedor.');
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
              value={vendedor.nome}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={vendedor.email}
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

export default EditarVendedor;
