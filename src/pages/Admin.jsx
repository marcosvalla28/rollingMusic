import React, { useState } from 'react';
// Corrección de la ruta de importación: eliminamos la extensión '.jsx'
import { useSongs } from '../context/SongsContext'; 
import Canciones from '../components/Canciones.jsx'; 

const initialFormState = {
    title: '',
    artist: '',
    album: '',
    duration: '3:00',
    coverUrl: 'https://placehold.co/100x100/38bdf8/white?text=COVER',
};

const Admin = () => {
    // Obtenemos las funciones CRUD y la lista de canciones administradas
    const { adminSongs, addSong, deleteSong, updateSong } = useSongs();
    
    const [formData, setFormData] = useState(initialFormState);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage('');

        // Validación básica
        if (!formData.title || !formData.artist) {
            setMessage('El título y el artista son obligatorios.');
            return;
        }

        if (isEditing && editingId) {
            // Lógica de Edición
            updateSong(editingId, formData);
            setMessage(`Canción "${formData.title}" actualizada con éxito.`);
        } else {
            // Lógica de Adición
            addSong(formData);
            setMessage(`Canción "${formData.title}" agregada con éxito a la lista.`);
        }

        // Limpiar formulario y estado
        setFormData(initialFormState);
        setIsEditing(false);
        setEditingId(null);

        // Limpiar mensaje después de 3 segundos
        setTimeout(() => setMessage(''), 3000);
    };

    const handleEditClick = (song) => {
        // Carga los datos de la canción en el formulario para editar
        setFormData({ 
            title: song.title || '',
            artist: song.artist || '',
            album: song.album || '',
            duration: song.duration || '3:00',
            coverUrl: song.coverUrl || initialFormState.coverUrl,
        });
        setIsEditing(true);
        setEditingId(song.codigo_unico);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setFormData(initialFormState);
        setIsEditing(false);
        setEditingId(null);
    };

    // Estilos de Tailwind CSS para el formulario
    const inputStyle = "w-full p-3 bg-neutral-800 border border-violet-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm transition";
    const buttonStyle = "w-full py-3 mt-4 text-white font-semibold rounded-lg transition duration-200";

    return (
        <div className="p-4 md:p-8 bg-black min-h-screen text-white">
            <h1 className="text-4xl font-bold text-violet-400 mb-8 border-b border-violet-700 pb-3">
                Panel de Administración de la Lista de Reproducción
            </h1>

            {/* FORMULARIO DE CREACIÓN/EDICIÓN */}
            <div className="bg-neutral-900 p-6 rounded-xl shadow-2xl max-w-2xl mx-auto mb-10">
                <h2 className="text-2xl font-semibold mb-6 text-gray-200">
                    {isEditing ? `Editar Canción: ${editingId}` : "Agregar Nueva Canción"}
                </h2>
                
                {message && (
                    <div className={`p-3 mb-4 rounded-lg text-center ${message.includes('éxito') ? 'bg-green-600' : 'bg-red-600'}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium mb-1 text-gray-400">Título</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} className={inputStyle} required />
                    </div>
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium mb-1 text-gray-400">Artista</label>
                        <input type="text" name="artist" value={formData.artist} onChange={handleChange} className={inputStyle} required />
                    </div>
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium mb-1 text-gray-400">Álbum</label>
                        <input type="text" name="album" value={formData.album} onChange={handleChange} className={inputStyle} />
                    </div>
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium mb-1 text-gray-400">Duración</label>
                        <input type="text" name="duration" value={formData.duration} onChange={handleChange} className={inputStyle} />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1 text-gray-400">URL de la Carátula</label>
                        <input type="url" name="coverUrl" value={formData.coverUrl} onChange={handleChange} className={inputStyle} />
                    </div>
                    
                    <div className="md:col-span-2 flex space-x-4">
                        <button 
                            type="submit" 
                            className={`${buttonStyle} ${isEditing ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-violet-600 hover:bg-violet-700'}`}
                        >
                            {isEditing ? "Guardar Cambios" : "Agregar Canción"}
                        </button>
                        {isEditing && (
                            <button 
                                type="button" 
                                onClick={handleCancelEdit} 
                                className={`${buttonStyle} bg-gray-500 hover:bg-gray-600`}
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* LISTA DE CANCIONES CREADAS */}
            <h2 className="text-3xl font-bold text-violet-400 mt-12 mb-6 border-b border-violet-700 pb-2">
                Canciones en la Lista ({adminSongs.length})
            </h2>

            {adminSongs.length === 0 ? (
                <div className="text-center py-10 text-gray-400 bg-neutral-900 p-6 rounded-lg">
                    <p>Aún no has agregado canciones. Usa el formulario de arriba para comenzar.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {/* Renderizamos las canciones como una tabla/lista manejable */}
                    {adminSongs.map((song) => (
                        <div key={song.codigo_unico} className="flex items-center bg-neutral-800 p-4 rounded-lg shadow-md hover:bg-neutral-700 transition">
                            <img 
                                src={song.coverUrl || initialFormState.coverUrl} 
                                alt={`Carátula de ${song.title}`} 
                                className="w-12 h-12 object-cover rounded-md mr-4"
                                onError={(e) => { e.target.onerror = null; e.target.src = initialFormState.coverUrl; }} // Fallback en caso de error de URL
                            />
                            <div className="flex-grow">
                                <p className="font-semibold text-lg text-white">{song.title}</p>
                                <p className="text-sm text-gray-400">{song.artist} • {song.album}</p>
                            </div>
                            <div className="text-gray-400 text-sm mr-6 hidden sm:block">{song.duration}</div>
                            
                            {/* Botones de acción */}
                            <button 
                                onClick={() => handleEditClick(song)} 
                                className="p-2 text-yellow-400 hover:text-yellow-300 transition mr-2"
                                title="Editar"
                            >
                                {/* Icono de Lápiz */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <button 
                                onClick={() => deleteSong(song.codigo_unico)} 
                                className="p-2 text-red-400 hover:text-red-300 transition"
                                title="Eliminar"
                            >
                                {/* Icono de Papelera */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 7a1 1 0 012 0v5a1 1 0 11-2 0V7zm6 0a1 1 0 11-2 0v5a1 1 0 112 0V7z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Admin;
