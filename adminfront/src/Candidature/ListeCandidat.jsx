

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ListeCandidat = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [filterSkills, setFilterSkills] = useState("");
  const [filterPosition, setFilterPosition] = useState("");

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await axios.get("http://localhost:5000/get-files");
        setFiles(res.data.data);
      } catch (err) {
        setError("Failed to fetch files");
      }
    };

    fetchFiles();
  }, []);

  const handleDetail = (candidate) => {
    setSelectedCandidate(candidate);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
  };

  const filteredFiles = files.filter((file) => {
    if (
      (filterSkills === "" || file.skillsTitle === filterSkills) &&
      (filterPosition === "" || file.position === filterPosition)
    ) {
      return true;
    }
    return false;
  });

  return (
    <div className="list-container">
      <h2>Liste des candidatures</h2>
      {error && <p>{error}</p>}
<Form className="text-center mb-3">
  <Form.Group controlId="filterSkills" className="d-flex align-items-center">
    <Form.Label className="me-2 mb-0">Compétence :</Form.Label>
    <Form.Control
      type="text"
      placeholder="Recherche par compétence"
      value={filterSkills}
      onChange={(e) => setFilterSkills(e.target.value)}
    />
  </Form.Group>
  <Form.Group controlId="filterPosition" className="d-flex align-items-center">
    <Form.Label className="me-2 mb-0">Poste envisagé :</Form.Label>
    <Form.Control
      type="text"
      placeholder="Recherche par poste envisagé"
      value={filterPosition}
      onChange={(e) => setFilterPosition(e.target.value)}
    />
  </Form.Group>
</Form>


      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Compétence</th>
            <th>Poste Actuel</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredFiles.map((file) => (
            <tr key={file._id}>
              <td>{file.name}</td>
              <td>{file.email}</td>
              <td>{file.skillsTitle}</td>
              <td>{file.currentPosition}</td>
              <td>
                <Button variant="primary" onClick={() => handleDetail(file)}>
                  Détail
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showDetailModal} onHide={handleCloseDetailModal}>
        <Modal.Header closeButton>
          <Modal.Title>Détails du candidat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCandidate && (
            <div>
              <Table bordered>
                <tbody>
                  <tr>
                    <td>Nom</td>
                    <td>{selectedCandidate.name}</td>
                  </tr>
                  <tr>
                    <td>Prenom</td>
                    <td>{selectedCandidate.prenom}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{selectedCandidate.email}</td>
                  </tr>
                  <tr>
                    <td>Date de naissance</td>
                    <td>{selectedCandidate.birthdate}</td>
                  </tr>
                  <tr>
                    <td>Téléphone :</td>
                    <td>{selectedCandidate.phone}</td>
                  </tr>
                  <tr>
                    <td>Poste actuel :</td>
                    <td>{selectedCandidate.currentPosition}</td>
                  </tr>
                  <tr>
                    <td>Poste souhaité :</td>
                    <td>{selectedCandidate.position}</td>
                  </tr>
                  <tr>
                    <td>Type d'emploi :</td>
                    <td>{selectedCandidate.employmentType}</td>
                  </tr>
                  <tr>
                    <td>Expérience :</td>
                    <td>{selectedCandidate.experience}</td>
                  </tr>
                  <tr>
                    <td>Description du poste :</td>
                    <td>{selectedCandidate.jobDescription}</td>
                  </tr>
                  <tr>
                    <td>Titre du poste :</td>
                    <td>{selectedCandidate.jobTitle}</td>
                  </tr>
                  <tr>
                    <td>Entreprise actuelle :</td>
                    <td>{selectedCandidate.company}</td>
                  </tr>
                  <tr>
                    <td>Lieu :</td>
                    <td>{selectedCandidate.location}</td>
                  </tr>
                  <tr>
                    <td>Date de début :</td>
                    <td>{selectedCandidate.startDate}</td>
                  </tr>
                  <tr>
                    <td>Date de fin :</td>
                    <td>{selectedCandidate.endDate}</td>
                  </tr>
                  <tr>
                    <td>Réalisations :</td>
                    <td>{selectedCandidate.achievements}</td>
                  </tr>
                  <tr>
                    <td>Compétences utilisées :</td>
                    <td>{selectedCandidate.skillsUsed}</td>
                  </tr>
                  <tr>
                    <td>Titre des compétences :</td>
                    <td>{selectedCandidate.skillsTitle}</td>
                  </tr>
                  <tr>
                    <td>Outils techniques :</td>
                    <td>{selectedCandidate.outil}</td>
                  </tr>
                  <tr>
                    <td>Description des compétences :</td>
                    <td>{selectedCandidate.skillsDescription}</td>
                  </tr>
                  <tr>
                    <td>Années d'expérience des compétences :</td>
                    <td>{selectedCandidate.skillsYears}</td>
                  </tr>
                  <tr>
                    <td>Certificats obtenus :</td>
                    <td>{selectedCandidate.certificat}</td>
                  </tr>
                  <tr>
                    <td>Titre des compétences :</td>
                    <td>{selectedCandidate.skillsTitleTransversal}</td>
                  </tr>
                  <tr>
                    <td>Description des compétences :</td>
                    <td>{selectedCandidate.skillsDescriptionTransversal}</td>
                  </tr>
                  <tr>
                    <td>Années d'expérience des compétences :</td>
                    <td>{selectedCandidate.skillsYearsTransversal}</td>
                  </tr>
                  <tr>
                    <td>
                      <p>
                        File:{" "}
                        <a
                          href={`http://localhost:5000/files/${selectedCandidate.pdf}`}
                          download
                        >
                          {selectedCandidate.pdf}
                        </a>
                      </p>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetailModal}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListeCandidat;
