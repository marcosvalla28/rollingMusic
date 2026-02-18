import React, { useState, useEffect } from 'react';
import { songSchema } from '../utils/validation';
import { useSongs } from '../context/SongsContext'; // Para refrescar la lista
import Swal from 'sweetalert2';

const initialFormState = {
    titulo: '',
    artista: '',
    categoria: '',
};

const SongForm = ({ initialData, onSubmit, onCancel }) => {
    const { syncSongs } = useSongs();
    const [formData, setFormData] = useState(initialFormState);
    const [files, setFiles] = useState({ audio: null, cover: null });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData(initialFormState);
            setFiles({ audio: null, cover: null });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) setErrors({ ...errors, [name]: null });
    };

    // Nuevo: Maneja la selección de archivos físicos
    const handleFileChange = (e) => {
        const { name, files: selectedFiles } = e.target;
        setFiles({ ...files, [name]: selectedFiles[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        try {
            // 1. Validamos los campos de texto con tu Zod schema
            songSchema.parse(formData);

            // 2. Preparamos el FormData (Obligatorio para Multer)
            const data = new FormData();
            data.append('title', formData.titulo);
            data.append('artist', formData.artista);
            data.append('album', formData.categoria);
            
            // Solo adjuntamos archivos si existen (necesario para creación)
            if (files.audio) data.append('audio', files.audio);
            if (files.cover) data.append('cover', files.cover);

            // 3. Enviamos al controlador del componente padre (Admin.jsx)
            // El componente Admin.jsx debería llamar a musicApi.post('/song', data)
            await onSubmit(data);
            
            // 4. Refrescamos el contexto global de canciones
            syncSongs();

            if (!initialData) {
                setFormData(initialFormState);
                setFiles({ audio: null, cover: null });
                e.target.reset(); // Limpia los inputs de archivo
            }

        } catch (error) {
            if (error.issues) {
                const newErrors = {};
                error.issues.forEach(issue => {
                    newErrors[issue.path[0]] = issue.message; 
                });
                setErrors(newErrors);
            } else {
                console.error("Error en la operación:", error);
            }
        } finally {
            setLoading(false);
        }
    };

    // Helper renderInput mejorado para aceptar archivos
    const renderInput = (name, label, type = 'text', isFile = false) => (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
                type={type}
                id={name}
                name={name}
                accept={name === 'cover' ? "image/*" : name === 'audio' ? "audio/*" : ""}
                value={isFile ? undefined : (formData[name] || '')}
                onChange={isFile ? handleFileChange : handleChange}
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors[name] ? 'border-red-500' : 'border-gray-300'}`}
                required={!initialData && isFile} // Obligatorio solo al crear
            />
            {errors[name] && <p className="mt-1 text-sm text-red-500">{errors[name]}</p>}
        </div>
    );

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 border-b pb-2">
                {initialData ? 'Editar Canción' : 'Publicar Contenido Original'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderInput('titulo', 'Título de la Canción')}
                {renderInput('artista', 'Artista o Grupo')}
            </div>
            
            {renderInput('categoria', 'Álbum / Categoría')}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderInput('cover', 'Archivo de Carátula', 'file', true)}
                {renderInput('audio', 'Archivo MP3 / Audio', 'file', true)}
            </div>
            
            <div className="flex justify-start space-x-4 pt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-200 disabled:bg-gray-400"
                >
                    {loading ? 'Subiendo...' : initialData ? 'Guardar Cambios' : 'Crear Canción'}
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