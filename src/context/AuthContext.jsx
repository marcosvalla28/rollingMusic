import React, { createContext, useContext, useState, useEffect } from 'react';
import musicApi from '../services/musicApi'; 
import googleAuthService from '../services/googleAuth'; 
import Swal from 'sweetalert2';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const saveSession = (userData, token) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const loginWithEmail = async (email, password) => {
        try {
            const response = await musicApi.post('/auth/login', { email, password });
            const { token, data } = response.data;
            saveSession({
                id: data.id || data._id,
                email: data.email,
                displayName: data.name,
                role: data.role,
                avatar: data.profilePic
            }, token);
            return data;
        } catch (error) {
            throw error; 
        }
    };

    const loginWithGoogle = async () => {
        try {
            const firebaseUser = await googleAuthService.loginWithGoogle();
            const fullName = firebaseUser.displayName || "Usuario Google";
            const [firstName, ...lastNameParts] = fullName.split(" ");
            const lastName = lastNameParts.join(" ") || "Google";

            const response = await musicApi.post('/auth/login', { 
                email: firebaseUser.email,
                name: firstName,
                surname: lastName,
                isGoogleLogin: "true" 
            });

            const { token, data } = response.data;
            saveSession({
                id: data.id || data._id,
                email: data.email,
                displayName: data.name,
                role: data.role,
                avatar: data.profilePic || firebaseUser.photoURL
            }, token);

            return response.data;
        } catch (error) {
            console.error('Detalle error backend:', error.response?.data);
            throw error; 
        }
    };

    const updateUserData = async (updatedData) => {
        try {
            const dataToSend = {
                name: updatedData.name,
                surname: updatedData.surname
            };
            const response = await musicApi.put('/auth/profile/update', dataToSend);
            const { data } = response.data;
            const newUserState = { 
                ...user, 
                displayName: `${data.name} ${data.surname || ''}`.trim()
            };
            saveSession(newUserState, localStorage.getItem('token'));
            return data;
        } catch (error) {
            throw error;
        }
    };

    const registerWithEmail = async (formData) => {
        try {
            await musicApi.post('/auth/register', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            Swal.fire({
                title: '¡Registro exitoso!',
                text: 'Te enviamos un código de verificación. Revisa tu email para activar tu cuenta.',
                icon: 'success'
            });
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.clear();
        googleAuthService.logout(); 
    };

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        if (storedUser && token) setUser(storedUser);
        setIsLoading(false);
    }, []);

    const isAdmin = user && (user.role === 'admin' || user.role === 'superadmin');

    const value = {
        user,
        isAdmin, 
        isLogged: !!user,
        isLoading,
        loginWithEmail,
        loginWithGoogle,
        updateUserData,
        registerWithEmail,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};