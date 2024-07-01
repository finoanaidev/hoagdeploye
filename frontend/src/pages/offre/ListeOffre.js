import axios from 'axios';
import './listeOffre.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const ListeOffre = ({ searchTerm }) => {
  const navigate = useNavigate();
  const [offres, setOffres] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchOffres = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/recrutements');
        setOffres(res.data);
      } catch (err) {
        setError('Erreur lors de la récupération des offres');
      }
    };

    fetchOffres();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/recrutements/${id}`);
      setOffres(offres.filter(offre => offre._id !== id));
      alert('Offre supprimée avec succès');
    } catch (err) {
      console.error('Erreur lors de la suppression de l\'offre', err);
    }
  };

  // Utilisez searchTerm pour filtrer les offres
  const filteredOffres = offres.filter(offre => offre.entreprise.toLowerCase().includes(searchTerm.toLowerCase()) || offre.mission.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className='ListeOffre'>
      <h2>Liste des Offres d'Emploi</h2>
      {error && <p className="error-message">{error}</p>}
      <ul>
        {filteredOffres.map(offre => (
          <li key={offre._id}>
            <p><strong>Entreprise:</strong> {offre.entreprise}</p>
            <p><strong>Mission :</strong> {offre.mission}</p>
            <p><strong>Compétence obligatoire:</strong> {offre.competenceObligatoire}</p>
            <p><strong>Compétence souhaité:</strong> {offre.competenceSouhaite}</p>
            <p><strong>Certificat:</strong> {offre.certificat}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListeOffre;
