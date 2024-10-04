import axios from "axios";
import Formulario from '../components/Formulario';

function CadastrarGrupoProduto() {
    // Campos a serem enviados ao formulário //
    const campos = [
        { nome: 'tipo_produto', label: 'Tipo de Produto', tipo: 'text' },
    ];

    const handleSubmit = async (dados) => {
        try {
            const response = await axios.post('https://pedrohs.pythonanywhere.com/grupo-produtos/', dados);
            console.log('Grupo de produto cadastrado com sucesso:', response.data);
            alert('Grupo de produto cadastrado com sucesso no banco de dados!');
          } catch (error) {
            console.error('Erro ao cadastrar Grupo de produto:', error);
            alert('Erro de conexão com a API.');
          }
    };

    return (
        <div>
            <Formulario 
                campos={campos} 
                titulo="Cadastro de Grupo de Produtos" 
                onSubmit={handleSubmit} 
            />
        </div>
    );
}

export default CadastrarGrupoProduto;