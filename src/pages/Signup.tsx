// src/components/Registro.tsx
import React, { useState } from "react";
import CountrySelect from "../components/CountrySelect";
import { Header, Container, Button, Footer, Form, Input, ErrorLabel } from "../components/ComponentStyles";
import { FormData } from '../types/types';
import { useNavigate } from 'react-router-dom';
import { registerUser } from "../services/Api";
import  "./Signup.css";
const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const isFormValid = (formData: FormData) => {
    const { email, nombreCompleto, age, nombreUsuario, country, password } = formData;
    const emailValid = isEmailValid(email);
    const nombreCompletoValid = nombreCompleto.length > 0;
    const ageValid = Number(age) > 0;
    const nombreUsuarioValid = nombreUsuario.length > 0;
    const countryValid = country.length > 0;
    const passwordValid = password.length >= 8;

    return emailValid && nombreCompletoValid && ageValid && nombreUsuarioValid && countryValid && passwordValid;
};

const SignUp: React.FC = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [formData, setFormData] = useState<FormData>({
        email: '',
        nombreCompleto: '',
        age: '',
        nombreUsuario: '',
        country: '',
        password: '',
    });

    const [emailError, setEmailError] = useState<string | undefined>(undefined);
    const [nameError, setNameError] = useState<string | undefined>(undefined);
    const [ageError, setAgeError] = useState<string | undefined>(undefined);
    const [nameUserError, setNameUserError] = useState<string | undefined>(undefined);
    const [passwordError, setPasswordError] = useState<string | undefined>(undefined);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        switch (name) {
            case 'nombreCompleto':
                if (value.length > 0) {
                    setNameError(undefined);
                } else {
                    setNameError('El nombre completo es requerido.');
                }
                break;

            case 'age':
                const numericValue = Number(value);
                if (numericValue > 0 && numericValue <= 100) {
                    setAgeError(undefined);
                } else {
                    setAgeError('La edad debe ser un número mayor a 0 y menor o igual a 100.');
                }
                break;

            case 'nombreUsuario':
                if (/\s/.test(value)) {
                    setNameUserError("El nombre de usuario no puede tener espacios en blanco.");
                } else {
                    setNameUserError("");
                }
                break;
            case 'email':
            case 'password':
                //logic in handleblur
                break;
            default:
                break;
        }

        // Actualizar el estado de formData
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        switch (name) {
            case 'email':
                if (!isEmailValid(value)) {
                    setEmailError('El correo electrónico no es válido.');
                } else {
                    setEmailError(undefined);
                }
                break;
            case 'password':
                if (value.length < 8)
                    setPasswordError('La contraseña debe tener 8 caracteres como mínimo');
                else
                    setPasswordError('');
                break;
            default:
                break;
        }
    };

    const handleCountryChange = (countryName: string) => {
        console.log(countryName);

        setFormData({
            ...formData,
            country: countryName, // Puedes ajustar esto para usar el código o la etiqueta según sea necesario
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isFormValid(formData)) {
            try {
                const response = await registerUser(formData);
                if (response && response.token) {
                    // Si la respuesta es exitosa, redirigimos a la página de bienvenida
                    navigate('/welcome', { state: { username: formData.nombreUsuario } });
                } else {
                    // Si la respuesta no es ok, manejamos el error
                    console.error('Registration failed:', response.statusText);
                    alert('Error during registration. Please try again.');
                }
            } catch (error) {
                console.error('Error during registration:', error);
                // Aquí puedes manejar el error, mostrar un mensaje en la UI, etc.
            }
        }
    };

    return (
        <>
            <Header>
                <h1>Registrarse en DELI</h1>
            </Header>

            <Container>
                <Form onSubmit={handleSubmit}>
                {emailError && <ErrorLabel>{emailError}</ErrorLabel>}
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {nameError && <ErrorLabel>{nameError}</ErrorLabel>}
                    <Input
                        type="text"
                        name="nombreCompleto"
                        placeholder="Nombre Completo"
                        value={formData.nombreCompleto}
                        onChange={handleChange}
                    />
                    {ageError && <ErrorLabel>{ageError}</ErrorLabel>}
                    <Input
                        type="number"
                        name="age"
                        placeholder="Edad"
                        value={formData.age}
                        onChange={handleChange}
                        min="1"
                        max="999"
                    />
                    {nameUserError && <ErrorLabel>{nameUserError}</ErrorLabel>}
                    <Input
                        type="text"
                        name="nombreUsuario"
                        placeholder="Nombre de Usuario"
                        value={formData.nombreUsuario}
                        onChange={handleChange}
                    />
                    <CountrySelect
                        onCountryChange={handleCountryChange}
                        
                    />
                    {passwordError && <ErrorLabel>{passwordError}</ErrorLabel>}
                    <Input
                        type="password"
                        name="password"
                        placeholder="Contraseña (mín. 8 caracteres)"
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <Button
                        type="submit"
                        disabled={!isFormValid(formData)}
                    >
                        Crear cuenta
                    </Button>
                </Form>
            </Container>

            <Footer>
                <p>&copy; 2024 DELI</p>
            </Footer>
        </>
    );
};

export default SignUp;
