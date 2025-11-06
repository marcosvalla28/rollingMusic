import { z } from 'zod';

// Schema para el Login (asumo que ya lo tienes o lo necesitarás)
export const loginSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

// Schema para el Registro (asumo que ya lo tienes o lo necesitarás)
export const registerSchema = z.object({
    username: z.string().min(3, 'El nombre de usuario debe tener al menos 3 caracteres'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coínciden',
    path: ['confirmPassword']
});

// ----------------------------------------------------
// SCHEMA CRÍTICO PARA EL CRUD DE CANCIONES
// ----------------------------------------------------
export const songSchema = z.object({
    titulo: z.string().min(3, 'El título es requerido y debe tener al menos 3 caracteres'),
    artista: z.string().min(3, 'El artista o grupo es requerido'),
    categoria: z.string().min(3, 'La categoría (Álbum) es requerida'),
    url_imagen: z.string().url('URL de Imagen inválida').min(1, 'La URL de imagen es requerida'),
    url_cancion: z.string().url('URL de Canción inválida').min(1, 'La URL de canción es requerida'),
});