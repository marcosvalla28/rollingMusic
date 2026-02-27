import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import musicApi from "../services/musicApi";
import googleAuthService from "../services/googleAuth";
import Swal from "sweetalert2";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth debe usarse dentro de un AuthProvider");
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser]         = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const saveSession = useCallback((userData, token) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    }, []);

    const loginWithEmail = useCallback(async (email, password) => {
        const response = await musicApi.post("/auth/login", { email, password });
        const { token, data } = response.data;

        if (!data || !token) throw new Error("Respuesta inesperada del backend");

        saveSession({
            id: data?.id || data?._id || null,
            email: data?.email || email,
            displayName: data?.name,
            role: data?.role || "user",
            avatar: data?.profilePic || null,
            isGoogleUser: false,
        }, token);

        return data;
    }, [saveSession]);

    const loginWithGoogle = useCallback(async () => {
        try {
            const firebaseUser = await googleAuthService.loginWithGoogle();
            if (!firebaseUser?.email) throw new Error("No se pudo obtener el usuario de Google");

            const fullName = firebaseUser.displayName || "Usuario Google";
            const [firstName, ...lastNameParts] = fullName.split(" ");
            const lastName = lastNameParts.join(" ") || "Google";

            const response = await musicApi.post("/auth/login", {
                email: firebaseUser.email,
                name: firstName,
                surname: lastName,
                isGoogleLogin: true,
            });

            const { token, data } = response.data;
            if (!data || !token) throw new Error("Respuesta inesperada del backend");

            saveSession({
                id: data?.id || data?._id || null,
                email: data?.email || firebaseUser.email,
                displayName: data?.name || firebaseUser.displayName,
                role: data?.role || "user",
                avatar: data?.profilePic || firebaseUser.photoURL || null,
                isGoogleUser: true,
            }, token);

            return response.data;
        } catch (error) {
            console.log("Errores específicos:", JSON.stringify(error.response?.data?.errors));
            throw error;
        }
    }, [saveSession]);

    const updateUserData = useCallback(async (updatedData) => {
        const response = await musicApi.put("/auth/profile/update", {
            name: updatedData.name,
            surname: updatedData.surname,
        });

        const { token: newToken, data } = response.data;
        const updatedToken = newToken || localStorage.getItem("token");

        const newUserState = {
            ...user,
            displayName: `${data.name} ${data.surname || ""}`.trim(),
        };

        saveSession(newUserState, updatedToken);
        return data;
    }, [user, saveSession]);

    const registerWithEmail = useCallback(async (formData) => {
        await musicApi.post("/auth/register", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        Swal.fire({
            title: "¡Registro exitoso!",
            text: "Te enviamos un código de verificación. Revisa tu email para activar tu cuenta.",
            icon: "success",
        });
    }, []);

    const logout = useCallback(() => {
        try {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            if (storedUser?.isGoogleUser) googleAuthService.logout();
        } catch {
            // Si hay error leyendo localStorage, igual continuamos
        } finally {
            setUser(null);
            localStorage.clear();
        }
    }, []);

    useEffect(() => {
        try {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            const token = localStorage.getItem("token");
            if (storedUser && token) setUser(storedUser);
        } catch {
            localStorage.clear();
        } finally {
            setIsLoading(false);
        }
    }, []);

    const isAdmin = user && (user.role === "admin" || user.role === "superadmin");

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