// src/pages/Welcome.tsx
import React from 'react';
import { Header, Container, Footer } from '../components/ComponentStyles';
import { useLocation } from 'react-router-dom';

const Welcome: React.FC = () => {
    const location = useLocation();
    const username = location.state?.username || 'Usuario';

    return (
        <>
            <Header>
                <h1>Welcome to DELI</h1>
            </Header>

            <Container>
                <h1>Welcome to DELI, {username}!</h1>
                <p>Thank you for registering.</p>
            </Container>

            <Footer>
                <p>&copy; 2024 DELI</p>
            </Footer>
        </>
    );
};

export default Welcome;
