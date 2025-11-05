import React from 'react';
// Importa el componente de formulario con la lógica de registro
import RegisterForm from '../components/RegisterForm'; 

const Register = () => {
    /* El RegisterForm ya contiene el diseño (Tailwind) y la lógica de estado (Zod, useAuth),
      por lo que la página solo necesita renderizarlo.
    */
    return (
        <RegisterForm />
    );
};

export default Register;