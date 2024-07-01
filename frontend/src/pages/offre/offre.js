import React, { useState, useEffect } from 'react';
import './offre.css';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Offre = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [offres, setOffres] = useState([]);
    const [candidatures, setCandidatures] = useState([]);

    useEffect(() => {
        const fetchOffres = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/recrutements');
                setOffres(res.data);
            } catch (err) {
                console.error('Erreur lors de la récupération des offres', err);
            }
        };

        const fetchCandidatures = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/candidatures');
                setCandidatures(res.data);
            } catch (err) {
                console.error('Erreur lors de la récupération des candidatures', err);
            }
        };

        fetchOffres();
        fetchCandidatures();
    }, []);

    const handleSearch = () => {
        if (!searchTerm.trim()) {
            setFilteredJobs([]);
            return;
        }

        const filteredOffres = offres.filter(offre => 
            offre.entreprise.toLowerCase().includes(searchTerm.toLowerCase()) || 
            offre.mission.toLowerCase().includes(searchTerm.toLowerCase()) ||
            offre.competenceSouhaite.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const filteredCandidatures = candidatures.filter(candidature => 
            candidature.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            candidature.prenom.toLowerCase().includes(searchTerm.toLowerCase()) || 
            candidature.skillsUsed.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredJobs([...filteredOffres, ...filteredCandidatures]);
    };

    return (
        <div className="offre">
            <div className={`search-container ${filteredJobs.length === 0 ? 'centered' : ''}`}>
                <h1>Votre recherche d'emploi commence ici</h1>
                <p>Trouvez le poste qui vous mérite.</p>
                <div className="search-bar">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Recherche par compétence, entreprise, etc." 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                    />
                    <button onClick={handleSearch} className="search-button">
                        <FaSearch />
                    </button>
                </div>
                <div className="result-count text-center mt-3">
                    {filteredJobs.length > 0 ? `${filteredJobs.length} résultat(s) trouvé(s)` : 'Trouvez votre emploi'}
                </div>
            </div>
            {filteredJobs.length > 0 && (
                <div className="job-results">
                    {filteredJobs.map((job, index) => (
                        <div className="job-result" key={index}>
                            <div className="job-header">
                                {job.entreprise || `${job.name} ${job.prenom}`}
                            </div>
                            <div className="job-body">
                                <h6>{job.mission || job.skillsUsed}</h6>
                                <p>{job.competenceSouhaite || job.skillsUsed}</p>
                                <div className="job-buttons">
                                    <Link to={`/detail/${job._id}`} className="voir-link">
                                        <button className="voir-btn">Voir</button>
                                    </Link>
                                    <Link to="/candidature" className="recruter-link">
                                        <button className="recruter-btn">Postuler</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Offre;
