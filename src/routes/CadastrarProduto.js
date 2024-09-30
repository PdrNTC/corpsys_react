import axios from "axios";
import Formulario from '../components/Formulario';

function CadastrarProduto() {
    // Campos a serem enviados ao formulário //
    const campos = [
        { nome: 'nome_produto', label: 'Nome do Produto', tipo: 'text' },
        { nome: 'preco', label: 'Preço do Produto', tipo: 'number' },
        { nome: 'grupo', label: 'Grupo do Produto', tipo: 'number' },
    ];

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