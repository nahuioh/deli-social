import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const Header = styled.header`
  padding: 1rem;
  background-color: #BF4F74;
  color: white;
  text-align: center;
`;

const Footer = styled.footer`
  padding: 1rem;
  background-color: #BF4F74;
  color: white;
  text-align: center;
  position: fixed;
  width: 100%;
  bottom: 0;
`;

const Container = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid #BF4F74;
  border-radius: 4px;
`;

const Button = styled.button<{ disabled: boolean }>`
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: ${props => props.disabled ? '#ccc' : '#BF4F74'};
  color: white;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};

  &:hover {
    background-color: ${props => !props.disabled && '#9f3d62'};
  }
`;

const isFormValid = (formData) => {
  const { email, nombreCompleto, edad, nombreUsuario, pais, contrasena } = formData;
  const emailValid = email.includes('@');
  const nombreCompletoValid = nombreCompleto.length > 0;
  const edadValid = Number(edad) > 0;
  const nombreUsuarioValid = nombreUsuario.length > 0;
  const paisValid = pais.length > 0;
  const contrasenaValid = contrasena.length >= 8;

  return emailValid && nombreCompletoValid && edadValid && nombreUsuarioValid && paisValid && contrasenaValid;
};

const Registro = () => {
  const [formData, setFormData] = useState({
    email: '',
    nombreCompleto: '',
    edad: '',
    nombreUsuario: '',
    pais: '',
    contrasena: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <Header>
        <h1>Registrarse en DELI</h1>
      </Header>

      <Container>
        <Form>
          <Input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={formData.email} 
            onChange={handleChange}
          />
          <Input 
            type="text" 
            name="nombreCompleto" 
            placeholder="Nombre Completo" 
            value={formData.nombreCompleto} 
            onChange={handleChange}
          />
          <Input 
            type="number" 
            name="edad" 
            placeholder="Edad" 
            value={formData.edad} 
            onChange={handleChange}
          />
          <Input 
            type="text" 
            name="nombreUsuario" 
            placeholder="Nombre de Usuario" 
            value={formData.nombreUsuario} 
            onChange={handleChange}
          />
          <Input 
            type="text" 
            name="pais" 
            placeholder="País" 
            value={formData.pais} 
            onChange={handleChange}
          />
          <Input 
            type="password" 
            name="contrasena" 
            placeholder="Contraseña (mín. 8 caracteres)" 
            value={formData.contrasena} 
            onChange={handleChange}
          />
          <Button 
            type="submit" 
            disabled={!isFormValid(formData)}
          >
            Registrarse
          </Button>
        </Form>
      </Container>

      <Footer>
        <p>&copy; 2024 DELI</p>
      </Footer>
    </>
  );
};

export default Registro;
