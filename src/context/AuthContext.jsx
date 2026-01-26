import React, { createContext, useContext, useState, useEffect } from 'react';
import googleAuthService from '../services/googleAuth'; // Tu servicio con roles para Google
import { auth } from '../config/firebase'; // Tu configuración de Firebase
// Importaciones necesarias de Firebase para Email/Password
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    updateProfile 
} from 'firebase/auth'; 
import Swal from 'sweetalert2';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // --- Helper para manejar el estado del usuario después de cualquier login/registro ---
    const handleAuthSuccess = (firebaseUser, role = 'user', displayName = null) => {
        // Creamos el objeto de usuario con el rol
        const userData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            // Prioriza el displayName dado, luego el de Firebase, sino el email
            displayName: displayName || firebaseUser.displayName || firebaseUser.email,
            role: role,
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return userData;
    };
    // -----------------------------------------------------------------------------------


    // 1. LOGIN CON GOOGLE (función anterior renombrada)
    const loginWithGoogle = async () => {
        try {
            // Asume que este servicio obtiene y devuelve el objeto {uid, email, role}
            const loggedUser = await googleAuthService.loginWithGoogle();
            setUser(loggedUser); 
        } catch (error) {
            console.error('Error en el Login con Google:', error);
            throw error; 
        }
    };
    
    // 2. LOGIN CON EMAIL/PASSWORD
    const loginWithEmail = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const firebaseUser = userCredential.user;
            
            // Al loguear con email, recuperamos el rol de localStorage
            const storedUser = JSON.parse(localStorage.getItem('user'));
            const role = storedUser?.role || 'user'; // Si no tiene rol, es 'user' por defecto

            return handleAuthSuccess(firebaseUser, role, firebaseUser.displayName);

        } catch (error) {
            console.error('Error en el Login con Email:', error);
            throw error;
        }
    };
    
    // 3. REGISTRO CON EMAIL/PASSWORD
    const registerWithEmail = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // 1. Establecer el nombre de usuario
    await updateProfile(firebaseUser, { displayName });

    // Mostramos la alerta estética
    await Swal.fire({
      title: '¡Bienvenido a RollingMusic!',
      text: 'Tu cuenta ha sido creada con éxito.',
      icon: 'success',
      confirmButtonColor: '#1DB954',
      timer: 3000, // Se cierra solo en 3 segundos si no tocan nada
      timerProgressBar: true
    });

    // 2. Asignar rol y guardar estado
    return handleAuthSuccess(firebaseUser, 'user', displayName);

  } catch (error) {
    let message = "No se pudo completar el registro.";
    
    // Mapeo profesional de errores
    if (error.code === 'auth/email-already-in-use') {
      message = "Este correo electrónico ya está en uso. Intenta con otro o inicia sesión.";
    } else if (error.code === 'auth/weak-password') {
      message = "La contraseña es muy débil. Debe tener al menos 6 caracteres.";
    } else if (error.code === 'auth/invalid-email') {
      message = "El formato del correo no es válido.";
    } else if (error.code === 'auth/operation-not-allowed') {
      message = "El registro con email no está habilitado en la consola de Firebase.";
    }

    // Seguimos lanzando el error por si el componente necesita manejar algo más
    throw error;
  }
};


    const logout = async () => {
        try {
            await googleAuthService.logout(); 
            setUser(null);
            localStorage.removeItem('user'); 
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    // Efecto que maneja la persistencia de sesión
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                const storedUser = JSON.parse(localStorage.getItem('user'));
                if (storedUser) {
                    setUser(storedUser);
                } else {
                    // Usuario autenticado en Firebase pero sin datos de rol en localStorage
                    // Podríamos forzar un re-login o dejarlo en null hasta que lo haga.
                    setUser(null); 
                }
            } else {
                setUser(null);
                localStorage.removeItem('user'); 
            }
            setIsLoading(false);
        });
        
        return () => unsubscribe();
    }, []);

    // Helper para determinar si es administrador
    const isAdmin = user && user.role === 'admin';

    const value = {
        user,
        isAdmin,
        isLogged: !!user,
        isLoading,
        loginWithGoogle,    // Acceso por Google
        loginWithEmail,     // Acceso por Email/Pass
        registerWithEmail,  // Registro por Email/Pass
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};