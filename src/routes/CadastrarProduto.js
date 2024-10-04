import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Formulario from '../components/Formulario';

function CadastrarProduto() {
  // Estado para armazenar os grupos de produtos
  const [grupos, setGrupos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Buscar grupos de produtos da API
  useEffect(() => {
    const fetchGrupos = async () => {
      try {
        const response = await axios.get('https://pedrohs.pythonanywhere.com/produtos/');
        setGrupos(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar grupos de produtos:', error);
        alert('Erro ao buscar os grupos de produtos na API!');
        setLoading(false);
      }
    };
    fetchGrupos();
  }, []);

  const handleSubmit = async (dados) => {
    try {
      const response = await axios.post('http://localhost:8000/produtos/', dados);
      console.log('Produto cadastrado com sucesso:', response.data);
      alert('Produto cadastrado com sucesso no banco de dados!');
    } catch (error) {
      console.error('Erro ao cadastrar Produto:', error);
      alert('Erro de conexão com a API.');
    }
  };

  if (loading) {
    return <p>Carregando grupos de produtos...</p>;
  }

  // Campos do formulário incluindo o select para grupos de produtos
  const campos = [
    { nome: 'nome_produto', label: 'Nome do Produto', tipo: 'text' },
    { nome: 'preco', label: 'Preço do Produto', tipo: 'number' },
    {
      nome: 'grupo',
      label: 'Grupo do Produto',
      tipo: 'select',
      opcoes: grupos.map((grupo) => ({ valor: grupo.id, label: grupo.tipo_produto })),
    },
  ];

  return (
    <div>
      <Formulario 
        campos={campos} 
        titulo="Cadastro de Produtos" 
        onSubmit={handleSubmit} 
      />
    </div>
  );
}

export default CadastrarProduto;
