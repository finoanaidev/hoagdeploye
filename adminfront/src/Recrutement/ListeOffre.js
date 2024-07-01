import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Pagination } from 'react-bootstrap';
import './listeOffre.css'

const ListeOffre = () => {
  const [offres, setOffres] = useState([]);
  const [filteredOffres, setFilteredOffres] = useState([]);
  const [error, setError] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [selectedOffre, setSelectedOffre] = useState(null);
  const [filterPoste, setFilterPoste] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  useEffect(() => {
    const fetchOffres = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/recrutements');
        setOffres(res.data);
        setFilteredOffres(res.data);
      } catch (err) {
        setError('Erreur lors de la récupération des offres');
      }
    };

    fetchOffres();
  }, []);

  useEffect(() => {
    const result = offres.filter(offre =>
      offre.poste.toLowerCase().includes(filterPoste.toLowerCase())
    );
    setFilteredOffres(result);
  }, [filterPoste, offres]);

  const toggleDetails = (offre) => {
    setSelectedOffre(offre);
    setShowDetails(true);
  };

  const closeDetails = () => {
    setSelectedOffre(null);
    setShowDetails(false);
  };

  const downloadPdf = (pdf) => {
    const pdfUrl = `http://localhost:5000/files/${pdf}`;
    window.open(pdfUrl, "_blank");
  };

  // Logic for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOffres.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="ListeOffre container">
      <h2 className='text-center'>Liste des Offres d'Emploi</h2>
      {error && <p className="text-danger">{error}</p>}

      <Form.Group controlId="filterPoste">
      <Form.Label>Filtrer par Poste</Form.Label>
      <Form.Control
        type="text"
        placeholder="Rechercher par poste"
        value={filterPoste}
        onChange={(e) => setFilterPoste(e.target.value)}
        className="custom-search-bar" // Ajoutez la classe custom-search-bar pour la stylisation
      />
    </Form.Group>
<br/>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Poste</th>
            <th>Entreprise</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(offre => (
            <tr key={offre._id}>
              <td>{offre.poste}</td>
              <td>{offre.entreprise}</td>
              <td>
                <Button variant="primary" onClick={() => toggleDetails(offre)}>Détail</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        {Array.from({ length: Math.ceil(filteredOffres.length / itemsPerPage) }).map((_, index) => (
          <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      {selectedOffre && (
        <Modal show={showDetails} onHide={closeDetails}>
          <Modal.Header closeButton>
            <Modal.Title>Détails de l'Offre</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Table striped bordered hover>
              <tbody>
                <tr>
                  <th>Entreprise</th>
                  <td>{selectedOffre.entreprise}</td>
                </tr>
                <tr>
                  <th>Poste</th>
                  <td>{selectedOffre.poste}</td>
                </tr>
                <tr>
                  <th>Référence</th>
                  <td>{selectedOffre.reference}</td>
                </tr>
                <tr>
                  <th>Mission</th>
                  <td>{selectedOffre.mission}</td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td>{selectedOffre.description}</td>
                </tr>
                <tr>
                  <th>Compétence obligatoire</th>
                  <td>{selectedOffre.competenceObligatoire}</td>
                </tr>
                <tr>
                  <th>Compétence souhaitée</th>
                  <td>{selectedOffre.competenceSouhaite}</td>
                </tr>
                <tr>
                  <th>Certificat</th>
                  <td>{selectedOffre.certificat}</td>
                </tr>
                <tr>
                  <th>Autre</th>
                  <td>{selectedOffre.autre}</td>
                </tr>
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={closeDetails}>
              Fermer
            </Button>
            <Button variant="success" onClick={() => downloadPdf(selectedOffre.pdf)}>
              Télécharger
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default ListeOffre;

