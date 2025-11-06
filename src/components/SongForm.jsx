import React, { useState, useEffect } from 'react';
import { songSchema } from '../utils/validation';

const initialFormState = {
    titulo: '',
    artista: '',
    categoria: '',
    url_imagen: '',
    url_cancion: '',
};

const SongForm = ({ initialData, onSubmit, onCancel }) => {
    // 1. Estado del Formulario
    const [formData, setFormData] = useState(initialFormState);
    const [errors, setErrors] = useState({});

    // 2. Efecto para manejar el modo EDICIÓN
    useEffect(() => {
        if (initialData) {
            // Si initialData existe, estamos editando: carga los datos
            setFormData(initialData);
        } else {
            // Si no, estamos creando: limpia el formulario
            setFormData(initialFormState);
        }
    }, [initialData]);

    // 3. Manejar cambios de Input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        
        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };

    // 4. Manejar Envío y Validación Zod
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({}); // Limpiar errores previos

        try {
            // Validación: parsear los datos con el schema
            const validatedData = songSchema.parse(formData);
            
            // Si es exitoso, llama a la función onSubmit (que está en Admin.jsx)
            onSubmit(validatedData);
            
            // Limpiar el formulario después de la creación/edición (si no estamos en modo edición)
            if (!initialData) {
                 setFormData(initialFormState);
            }

        } catch (error) {
            // Si Zod falla, el error tiene un formato específico (issues)
            if (error.issues) {
                const newErrors = {};
                error.issues.forEach(issue => {
                    // Mapea el error al nombre del campo
                    newErrors[issue.path[0]] = issue.message; 
                });
                setErrors(newErrors);
            } else {
                console.error("Error inesperado en la validación:", error);
            }
        }
    };
    
    // Función de ayuda para renderizar los campos con Tailwind
    const renderInput = (name, label, type = 'text') => (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
                type={type}
                id={name}
                name={name}
                value={formData[name] || ''} // Usar '' si es null
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors[name] ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors[name] && <p className="mt-1 text-sm text-red-500">{errors[name]}</p>}
        </div>
    );

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderInput('titulo', 'Título de la Canción')}
                {renderInput('artista', 'Artista o Grupo')}
            </div>
            
            {renderInput('categoria', 'Categoría (Álbum)')}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderInput('url_imagen', 'URL de Imagen (Carátula)', 'url')}
                {renderInput('url_cancion', 'URL de Canción (Preview)', 'url')}
            </div>
            
            <div className="flex justify-start space-x-4 pt-2">
                <button
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-200"
                >
                    {initialData ? 'Guardar Cambios' : 'Crear Canción'}
                </button>
                
                {initialData && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 transition duration-200"
                    >
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
};

export default SongForm;