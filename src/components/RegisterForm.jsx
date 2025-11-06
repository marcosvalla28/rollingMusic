import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerSchema } from '../utils/validation';
import { useAuth } from '../context/AuthContext'; // Importa el hook de Auth
import Fondo from '../assets/imagenes/logos/FondoLogo.jpg'

const initialFormState = { username: '', email: '', password: '', confirmPassword: '' };

const RegisterForm = () => {
    // IMPORTANTE: Asegúrate de que registerWithEmail esté expuesta en AuthContext
    const { registerWithEmail } = useAuth(); 
    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialFormState);
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: null });
        setServerError('');
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrors({}); 
        setServerError('');
        setIsSubmitting(true);

        try {
            // 1. Validación con Zod
            registerSchema.parse(formData);
            
            // 2. Llama a la función de registro por Email
            await registerWithEmail(formData.email, formData.password, formData.username);

            // Registro exitoso, redirigimos al login
            navigate('/login'); 

        } catch (error) {
            if (error.issues) {
                // Errores de Zod
                const newErrors = {};
                error.issues.forEach(issue => {
                    newErrors[issue.path[0]] = issue.message; 
                });
                setErrors(newErrors);
            } else {
                // Errores de Firebase/Servidor (ej. email ya en uso)
                setServerError('Error al registrar. El email podría estar ya en uso o el servidor falló.');
                console.error('Error de registro:', error);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    // Renderiza un campo de entrada estilizado con colores oscuros
    const renderInput = (name, label, type = 'text') => (
        <div>
            <input
                type={type} name={name} value={formData[name]} onChange={handleChange}
                placeholder={label}
                // Estilos oscuros aplicados aquí
                className={`w-full p-3 rounded-md bg-neutral-700 border text-white 
                           placeholder-gray-400 focus:ring-2 focus:ring-violet-500 
                           focus:border-violet-500 outline-none 
                           ${errors[name] ? 'border-red-500' : 'border-neutral-600'}`}
            />
            {errors[name] && <p className="mt-1 text-sm text-red-400">{errors[name]}</p>}
        </div>
    );

    return (
        <div style={{background: `url(${Fondo}) no-repeat center center / cover fixed`}} className="min-h-screen bg-black text-white flex items-center justify-center p-4">
            {/* Contenedor principal del layout de dos columnas */}
            <div className="relative w-full max-w-4xl bg-neutral-900 rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row-reverse">
                
                {/* Columna Izquierda: Logo y Mensaje (Reversa la columna para Registro) */}
                <div 
                    className="relative flex-1 p-8 flex flex-col items-center justify-center text-center 
                               bg-cover bg-center" 
                    style={{ 
                        // **IMPORTANTE: Reemplaza con la ruta de tu imagen de fondo**
                        backgroundImage: '',
                        backgroundSize: '300px 300px', 
                        backgroundColor: '#1a1a1a'
                    }}
                >
                    <div className="absolute inset-0 bg-black opacity-50"></div> 
                    
                    <div className="relative z-10 flex flex-col items-center">
                        {/* Círculo del Logo "RP" */}
                        <div className="w-48 h-48 rounded-full border-4 border-violet-500 flex items-center justify-center mb-6">
                            <span className="text-8xl font-bold text-violet-400">LOGO</span>
                        </div>
                        <p className="text-xl font-light text-gray-200">
                            Únete hoy y lleva tu música a todas partes.
                        </p>
                    </div>
                </div>

                {/* Columna Derecha: Formulario de Registro */}
                <div className="flex-1 p-8 bg-neutral-800 flex flex-col justify-center">
                    <h2 className="text-4xl font-extrabold text-white text-center mb-8">
                        Crear Cuenta
                    </h2>

                    {serverError && (
                        <div className="p-3 mb-4 text-sm text-red-400 bg-red-900 rounded-lg border border-red-700">
                            {serverError}
                        </div>
                    )}

                    {/* FORMULARIO DE EMAIL/PASSWORD */}
                    <form onSubmit={handleRegister} className="space-y-4">
                        {renderInput('username', 'Nombre de Usuario')}
                        {renderInput('email', 'Correo electrónico', 'email')}
                        {renderInput('password', 'Contraseña (mínimo 6 caracteres)', 'password')}
                        {renderInput('confirmPassword', 'Confirmar Contraseña', 'password')}

                        {/* Botón Registrarme */}
                        <button
                            type="submit" disabled={isSubmitting}
                            className="w-full py-3 bg-violet-600 text-white text-lg font-semibold rounded-md hover:bg-violet-700 transition duration-200 disabled:opacity-50 mt-6"
                        >
                            {isSubmitting ? 'Registrando...' : 'Registrarme'}
                        </button>
                    </form>

                    {/* Opción de Iniciar Sesión */}
                    <p className="text-center text-gray-300 mt-6 mb-4">
                        ¿Ya tienes una cuenta? <a href="/login" className="text-violet-400 font-semibold hover:text-violet-300"></a>
                    </p>
                    <a href="/login" className="w-full py-3 block text-center bg-neutral-700 hover:bg-neutral-600 rounded-md text-white text-lg font-semibold transition duration-200 border border-violet-500">
                        Inicia Sesión
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;