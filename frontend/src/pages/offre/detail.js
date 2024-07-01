import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./detail.css";

const Detail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/recrutements/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des détails de l'offre", err);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (!job) {
    return <p>Offre non trouvée</p>;
  }

  return (
    <div className="detail-container">
      <div className="detail-header">
        <h2>{job.entreprise}</h2>
      </div>
      <div className="detail-content">
        <h3 className="detail-title">Mission</h3>
        <p className="detail-text">{job.mission}</p>
        <h3 className="detail-title">Compétences Obligatoires</h3>
        <p className="detail-text">{job.competenceObligatoire}</p>
        <h3 className="detail-title">Compétences Souhaitées</h3>
        <p className="detail-text">{job.competenceSouhaite}</p>
        <Link to="/candidature">
          <button className="postuler-btn">Postuler</button>
        </Link>
      </div>
    </div>
  );
};

export default Detail;
