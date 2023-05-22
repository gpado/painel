import React from 'react';
import { useKeycloak } from '@react-keycloak/web';

export default function Login() {
    const { keycloak, initialized } = useKeycloak();

    const handleLogin = (event) => {
        event.preventDefault();
        if (keycloak) {
            keycloak.login();
        }
    };

    if (keycloak && keycloak.authenticated) {
        return (
            <div>
                <p>Bem-vindo, {keycloak.tokenParsed.preferred_username}</p>
                <button onClick={() => keycloak.logout()}>Sair</button>
            </div>
        );
    }

    return (
        <div>
            <button onClick={handleLogin}>Entrar</button>
        </div>
    );
}
