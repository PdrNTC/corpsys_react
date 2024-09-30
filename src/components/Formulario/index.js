// src/components/Formulario.js
import React from 'react';

const Formulario = ({ campos, titulo, onSubmit }) => {
  const [formData, setFormData] = React.useState(
    campos.reduce((acc, campo) => {
      acc[campo.nome] = '';
      return acc;
    }, {})
  );

  const handleChange = (evento) => {
    const { name, value } = evento.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (evento) => {
    evento.preventDefault();
    onSubmit(formData);
  };

  return (
    <div>
        <h2>{titulo}</h2>
        <form onSubmit={handleSubmit}>
            {campos.map((campo) => (
            <div key={campo.nome}>
                <label>{campo.label}:</label>
                <input
                type={campo.tipo}
                name={campo.nome}
                value={formData[campo.nome]}
                onChange={handleChange}
                required
                />
            </div>
            ))}
            <button type="submit">Cadastrar</button>
        </form>
    </div>
  );
};

export default Formulario;
