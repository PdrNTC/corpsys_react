import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import BotaoVoltar from '../components/BotaoVoltar';

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #1a1a1a;
`;

const FormContainer = styled.div`
  background-color: #333;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  color: #fff;
  width: 500px;
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #ff5252;
`;

const InputContainer = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #222;
  color: #fff;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #222;
  color: #fff;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #ff5252;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e04040;
  }
`;

const AddItemButton = styled.button`
  margin-top: 10px;
  width: 100%;
  padding: 10px;
  background-color: #ff5252;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  margin-bottom: 15px;

  &:hover {
    background-color: #e04040;
  }
`;

function CadastrarVendas() {
  const navigate = useNavigate();
  const [vendedores, setVendedores] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [itens, setItens] = useState([{ produto: '', quantidade: 1 }]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vendedoresResponse = await axios.get('http://localhost:8000/vendedores/');
        const clientesResponse = await axios.get('http://localhost:8000/clientes/');
        const produtosResponse = await axios.get('http://localhost:8000/produtos/');
        setVendedores(vendedoresResponse.data);
        setClientes(clientesResponse.data);
        setProdutos(produtosResponse.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        alert('Erro ao buscar os dados na API!');
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    const itensData = itens.map((item) => ({
      produto: parseInt(item.produto),
      quantidade: parseInt(item.quantidade),
    }));

    const dados = {
      vendedor_id: parseInt(evento.target.vendedor.value),
      cliente_id: parseInt(evento.target.cliente.value),
      itens_data: itensData,
    };

    try {
      const response = await axios.post('http://localhost:8000/vendas/', dados);
      console.log('Venda cadastrada com sucesso:', response.data);
      alert('Venda cadastrada com sucesso no banco de dados!');
      navigate('/');
    } catch (error) {
      console.error('Erro ao cadastrar Venda:', error);
      alert('Erro de conexão com a API.');
    }
  };

  const handleItemChange = (index, evento) => {
    const { name, value } = evento.target;
    const newItens = [...itens];
    newItens[index][name] = value;
    setItens(newItens);
  };

  const addItem = () => {
    setItens([...itens, { produto: '', quantidade: 1 }]);
  };

  return (
    <FormWrapper>
      <FormContainer>
        <FormTitle>Cadastro de Vendas</FormTitle>
        <form onSubmit={handleSubmit}>
          <InputContainer>
            <Label>Vendedor:</Label>
            <Select name="vendedor" required>
              <option value="" disabled>Selecione um vendedor</option>
              {vendedores.map((vendedor) => (
                <option key={vendedor.id} value={vendedor.id}>{vendedor.nome}</option>
              ))}
            </Select>
          </InputContainer>
          <InputContainer>
            <Label>Cliente:</Label>
            <Select name="cliente" required>
              <option value="" disabled>Selecione um cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
              ))}
            </Select>
          </InputContainer>
          {itens.map((item, index) => (
            <InputContainer key={index}>
              <Label>Produto:</Label>
              <Select name="produto" value={item.produto} onChange={(e) => handleItemChange(index, e)} required>
                <option value="" disabled>Selecione um produto</option>
                {produtos.map((produto) => (
                  <option key={produto.id} value={produto.id}>{produto.nome_produto}</option>
                ))}
              </Select>
              <Label>Quantidade:</Label>
              <Input
                type="number"
                name="quantidade"
                value={item.quantidade}
                onChange={(e) => handleItemChange(index, e)}
                min="1"
                required
              />
            </InputContainer>
          ))}
          <AddItemButton type="button" onClick={addItem}>Adicionar Item</AddItemButton>
          <SubmitButton type="submit">Cadastrar Venda</SubmitButton>
          <BotaoVoltar />
        </form>
      </FormContainer>
    </FormWrapper>
  );
}

export default CadastrarVendas;
