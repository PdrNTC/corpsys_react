import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
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

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #222;
  color: #fff;
`;

const Select = styled.select`
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

function RelatorioVendas() {
  const [clientes, setClientes] = useState([]);
  const [vendedores, setVendedores] = useState([]);
  const [formData, setFormData] = useState({
    data_inicial: '',
    data_final: '',
    cliente: '',
    vendedor: '',
    formato: 'pdf',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientesResponse = await axios.get('http://localhost:8000/clientes/');
        const vendedoresResponse = await axios.get('http://localhost:8000/vendedores/');
        setClientes(clientesResponse.data);
        setVendedores(vendedoresResponse.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        alert('Erro ao buscar os dados na API!');
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar as datas antes de fazer a requisição
    if (formData.data_inicial && formData.data_final && formData.data_inicial > formData.data_final) {
        alert("A data inicial não pode ser maior que a data final.");
        return;
    }

    try {
        const response = await axios.get('http://localhost:8000/vendas-efetuadas/', {
            params: {
                data_inicial: formData.data_inicial,
                data_final: formData.data_final,
                cliente_id: formData.cliente,
                vendedor_id: formData.vendedor,
                exportar: formData.formato,
            },
            responseType: 'blob', // para tratar arquivos binários (PDF ou Excel)
        });

        // Extensão dos arquivos para cada tipo
        const fileExtension = formData.formato === 'pdf' ? 'pdf' : 'xlsx';
        const contentType = formData.formato === 'pdf' 
            ? 'application/pdf' 
            : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

        // Baixar o arquivo recebido com a extensão correta no navegador //
        const url = window.URL.createObjectURL(new Blob([response.data], { type: contentType }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `relatorio-vendas.${fileExtension}`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        alert('Relatório gerado com sucesso!');
    } catch (error) {
        console.error('Erro ao gerar relatório:', error);
        alert('Erro ao gerar relatório.');
    }
};

  return (
    <FormWrapper>
      <FormContainer>
        <FormTitle>Relatório de Vendas</FormTitle>
        <form onSubmit={handleSubmit}>
          <InputContainer>
            <Label>Data Inicial:</Label>
            <Input
              type="date"
              name="data_inicial"
              value={formData.data_inicial}
              onChange={handleChange}
            />
          </InputContainer>
          <InputContainer>
            <Label>Data Final:</Label>
            <Input
              type="date"
              name="data_final"
              value={formData.data_final}
              onChange={handleChange}
            />
          </InputContainer>
          <InputContainer>
            <Label>Cliente:</Label>
            <Select
              name="cliente"
              value={formData.cliente}
              onChange={handleChange}
            >
              <option value="">Todos os clientes</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nome}
                </option>
              ))}
            </Select>
          </InputContainer>
          <InputContainer>
            <Label>Vendedor:</Label>
            <Select
              name="vendedor"
              value={formData.vendedor}
              onChange={handleChange}
            >
              <option value="">Todos os vendedores</option>
              {vendedores.map((vendedor) => (
                <option key={vendedor.id} value={vendedor.id}>
                  {vendedor.nome}
                </option>
              ))}
            </Select>
          </InputContainer>
          <InputContainer>
            <Label>Formato do Relatório:</Label>
            <Select
              name="formato"
              value={formData.formato}
              onChange={handleChange}
            >
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
            </Select>
          </InputContainer>
          <SubmitButton type="submit">Gerar Relatório</SubmitButton>
          <BotaoVoltar />
        </form>
      </FormContainer>
    </FormWrapper>
  );
}

export default RelatorioVendas;
