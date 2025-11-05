import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importa el hook de Auth
import { loginSchema } from '../utils/validation'; // Schema de Zod
import Fondo from '../assets/imagenes/logos/FondoLogo.jpg'

// Componente de Login Completo con el nuevo diseño
const LoginForm = () => {
    // Importante: Asegúrate de que loginWithEmail y loginWithGoogle estén expuestas en AuthContext
    const { loginWithGoogle, loginWithEmail } = useAuth(); 
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: null });
        setServerError('');
    };

    // ----------------------------------------------------
    // MANEJO DE LOGIN CON GOOGLE
    // ----------------------------------------------------
    const handleGoogleLogin = async () => {
        setIsSubmitting(true);
        setServerError('');
        try {
            await loginWithGoogle();
            navigate('/'); 
        } catch (error) {
            setServerError('Error al iniciar sesión con Google.');
        } finally {
            setIsSubmitting(false);
        }
    };
    
    // ----------------------------------------------------
    // MANEJO DE LOGIN CON EMAIL/PASSWORD
    // ----------------------------------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({}); 
        setServerError('');
        setIsSubmitting(true);

        try {
            // 1. Validación con Zod
            loginSchema.parse(formData);
            
            // 2. Llama a la función de login por Email
            await loginWithEmail(formData.email, formData.password);
            
            navigate('/'); // Login exitoso
            
        } catch (error) {
            if (error.issues) {
                // Errores de Zod
                const newErrors = {};
                error.issues.forEach(issue => {
                    newErrors[issue.path[0]] = issue.message; 
                });
                setErrors(newErrors);
            } else {
                // Errores de Firebase/Servidor
                setServerError('Credenciales incorrectas o usuario no encontrado.');
                console.error('Error de login:', error);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{background: `url(${Fondo}) no-repeat center center / cover fixed`}} className="min-h-screen bg-black text-white flex items-center justify-center p-4">
            {/* Contenedor principal del layout de dos columnas */}
            <div className="relative w-full max-w-4xl bg-neutral-900 rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row">
                
                {/* Columna Izquierda: Logo y Mensaje */}
                <div 
                    className="relative flex-1 p-8 flex flex-col items-center justify-center text-center 
                               bg-cover bg-center" 
                    style={{ 
                        // **IMPORTANTE: Reemplaza con la ruta de tu imagen de fondo**
                        backgroundImage: ``,
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
                            Deja que la música ruede. Tú solo dale play.
                        </p>
                    </div>
                </div>

                {/* Columna Derecha: Formulario de Login/Registro */}
                <div className="flex-1 p-8 bg-neutral-800 flex flex-col justify-center">
                    <h2 className="text-4xl font-extrabold text-white text-center mb-8">
                        Hola!!!
                    </h2>

                    {serverError && (
                        <div className="p-3 mb-4 text-sm text-red-400 bg-red-900 rounded-lg border border-red-700">
                            {serverError}
                        </div>
                    )}

                    {/* Botón de Social Login (SOLO GOOGLE) */}
                    <button
                        onClick={handleGoogleLogin}
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center py-3 px-4 bg-neutral-700 hover:bg-neutral-600 rounded-md text-white font-semibold transition duration-200 mb-6 disabled:opacity-50"
                    >
                        {/* SVG de Google (Estilizado para fondo oscuro) */}
                    <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    </svg>
                        {isSubmitting ? 'Conectando...' : 'Ingresar con Google'}
                    </button>
                    
                    <div className="relative flex justify-center text-xs uppercase mb-6">
                        <div className="flex-grow border-t border-neutral-700"></div>
                        <span className="flex-shrink mx-4 text-gray-500">O</span>
                        <div className="flex-grow border-t border-neutral-700"></div>
                    </div>

                    {/* FORMULARIO DE EMAIL/PASSWORD */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Input Email */}
                        <div>
                            <input
                                type="email" name="email" value={formData.email} onChange={handleChange}
                                placeholder="Correo electrónico"
                                className={`w-full p-3 rounded-md bg-neutral-700 border text-white placeholder-gray-400 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none ${errors.email ? 'border-red-500' : 'border-neutral-600'}`}
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                        </div>
                        
                        {/* Input Contraseña */}
                        <div>
                            <input
                                type="password" name="password" value={formData.password} onChange={handleChange}
                                placeholder="Contraseña"
                                className={`w-full p-3 rounded-md bg-neutral-700 border text-white placeholder-gray-400 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none ${errors.password ? 'border-red-500' : 'border-neutral-600'}`}
                            />
                            {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
                        </div>

                        <a href="#" className="text-sm text-gray-400 hover:text-violet-400 text-right block pt-2">
                            ¿Olvidaste tu contraseña?
                        </a>

                        {/* Botón Ingresar */}
                        <button
                            type="submit" disabled={isSubmitting}
                            className="w-full py-3 bg-violet-600 text-white text-lg font-semibold rounded-md hover:bg-violet-700 transition duration-200 disabled:opacity-50 mt-6"
                        >
                            {isSubmitting ? 'Ingresando...' : 'Ingresar'}
                        </button>
                    </form>

                    {/* Opción de Crear Cuenta */}
                    <p className="text-center text-gray-300 mt-6 mb-4">
                        ¿Sos nuevo? <a href="/register" className="text-violet-400 font-semibold hover:text-violet-300"></a>
                    </p>
                    <a href="/register" className="w-full py-3 block text-center bg-neutral-700 hover:bg-neutral-600 rounded-md text-white text-lg font-semibold transition duration-200 border border-violet-500">
                        Crear Cuenta
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;