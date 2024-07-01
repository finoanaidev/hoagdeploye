import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditOffre = () => {
  const { id } = useParams(); // Récupère l'ID de l'offre depuis l'URL
  const [offre, setOffre] = useState({});
  const [formData, setFormData] = useState({
    entreprise: '',
    poste: '',
    reference: '',
    mission: '',
    description: '',
    competenceObligatoire:'',
    competenceSouhaite:'',
    certificat:'',
    autre: ''
  });
  const [fetchError, setFetchError] = useState(''); // État pour gérer les erreurs de récupération
  const navigate = useNavigate(); // Hook pour la navigation

  useEffect(() => {
    const fetchOffre = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/recrutements/${id}`);
        setOffre(res.data);
        setFormData({
          entreprise: res.data.entreprise,
          poste: res.data.poste,
          reference: res.data.reference,
          mission: res.data.mission,
          description: res.data.description,
          competenceObligatoire: res.data.competenceObligatoire,
          competenceSouhaite: res.data.competenceSouhaite,
          certificat:'',
          autre: res.data.autre
        });
      } catch (err) {
        console.error('Erreur lors de la récupération de l\'offre', err);
        setFetchError('Offre non trouvée'); // Définir l'erreur si l'offre n'est pas trouvée
      }
    };

    fetchOffre();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/recrutements/${id}`, formData);
      alert('Offre modifiée avec succès');
      navigate('/offres'); // Rediriger après la modification
    } catch (err) {
      console.error('Erreur lors de la modification de l\'offre', err);
    }
  };

  if (fetchError) {
    return <p>{fetchError}</p>; // Afficher l'erreur si l'offre n'est pas trouvée
  }

  return (
    <div className="EditOffre">
      <h2>Modifier l'Offre d'Emploi</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="entreprise">Entreprise</label>
        <input type="text" id="entreprise" name="entreprise" value={formData.entreprise} onChange={handleChange} required />

        <label htmlFor="poste">Poste</label>
        <input type="text" id="poste" name="poste" value={formData.poste} onChange={handleChange} required />

        <label htmlFor="reference">Reference</label>
        <input type="text" id="reference" name="reference" value={formData.reference} onChange={handleChange} required />

        <label htmlFor="mission">Mission</label>
        <input type="text" id="mission" name="mission" value={formData.mission} onChange={handleChange} required />

        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="2" value={formData.description} onChange={handleChange} required></textarea>

        <label htmlFor="competenceObligatoire">Competence obligatoire</label>
        <input type="text" id="competenceObligatoire" name="competenceObligatoire" value={formData.competenceObligatoire} onChange={handleChange} required />

        <label htmlFor="competenceSouhaite">Compétence souhaité</label>
        <input type="text" id="competenceSouhaite" name="competenceSouhaite" value={formData.competenceSouhaite} onChange={handleChange} required />

        <label htmlFor="autre">Certificat</label>
        <textarea id="autre" name="certificat" rows="2" value={formData.certificat} onChange={handleChange} required></textarea>

        <label htmlFor="autre">Autre</label>
        <textarea id="autre" name="autre" rows="2" value={formData.autre} onChange={handleChange} required></textarea>


        <button type="submit">Enregistrer les modifications</button>
      </form>
    </div>
  );
};

export default EditOffre;
