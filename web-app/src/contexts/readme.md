Sirve para que hayan ficheros con funcionalidades de comprobacion de estado de ese componente. Por ejemplo: un fichero que compruebe si el componenete de login el usuario se encuentra logueado o no.

Tener una carpeta dedicada llamada "contexts" en tu proyecto de React puede ser una práctica organizativa muy útil por varias razones:

    - Claridad y organización: Los contextos en React se utilizan para gestionar el estado compartido entre varios componentes de tu aplicación. Al tener una carpeta dedicada para los contextos, puedes mantener todos los archivos relacionados con la gestión del estado en un lugar centralizado y fácilmente accesible.

    - Facilita la reutilización: Los contextos pueden ser reutilizados en diferentes partes de tu aplicación para compartir datos de manera eficiente entre componentes. Al tener una carpeta separada para los contextos, puedes almacenar contextos genéricos y específicos de la aplicación que pueden ser reutilizados en múltiples lugares.

    - Separación de preocupaciones: Separar los contextos en su propia carpeta ayuda a mantener una separación clara entre la lógica relacionada con el estado y la interfaz de usuario. Esto hace que sea más fácil de entender y mantener tu código a medida que tu proyecto crece.

EJEMPLO:

    // contexts/AuthContext.js

        import React, { createContext, useState } from 'react';

        // Creamos el contexto
        const AuthContext = createContext();

        // Creamos el proveedor del contexto
        const AuthProvider = ({ children }) => {
        const [isLoggedIn, setIsLoggedIn] = useState(false);

        const login = () => {
            setIsLoggedIn(true);
        };

        const logout = () => {
            setIsLoggedIn(false);
        };

        return (
            <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
            </AuthContext.Provider>
        );
        };

        export { AuthProvider, AuthContext };

    // components/Home.js

        import React, { useContext } from 'react';
        import { AuthContext } from '../contexts/AuthContext';

        const Home = () => {
        const { isLoggedIn, login, logout } = useContext(AuthContext);

        return (
            <div>
            {isLoggedIn ? (
                <button onClick={logout}>Logout</button>
            ) : (
                <button onClick={login}>Login</button>
            )}
            </div>
        );
        };

        export default Home;
