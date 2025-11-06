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

// SCHEMA PARA EL CRUD DE CANCIONES

export const songSchema = z.object({
    titulo: z.string().min(3, 'El título es requerido y debe tener al menos 3 caracteres'),
    artista: z.string().min(3, 'El artista o grupo es requerido'),
    album: z.string().min(3, 'La categoría (Álbum) es requerida'),
    duracion: z.string().min(1, 'La duración es requerida'),
    imagenUrl: z.string().url('URL de Imagen inválida').min(1, 'La URL de imagen es requerida'),
});