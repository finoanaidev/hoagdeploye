// src/components/FileUpload.js
import React, { useState } from "react";
import axios from "axios";
import "./candidature.css";
//import { useAuth } from "../../context/AuthContext";
import { IoIosLogIn } from "react-icons/io";

const FileUpload = () => {
  const [showSecondForm, setShowSecondForm] = useState(false);
  const [showThirdForm, setShowThirdForm] = useState(false);

  const [employmentTypeOptions, setEmploymentTypeOptions] = useState([]);
  const [contractTypeOptions, setContractTypeOptions] = useState([]);
  const [disponibiliteTypeOptions, setDisponibiliteTypeOptions] = useState([]);
  const [engagementTypeOptions, setEngagementTypeOptions] = useState([]);



  const [formData, setFormData] = useState({
    name: "",
    prenom: "",
    birthdate: "",
    email: "",
    phone: "",
    currentPosition: "",
    position: "",
    employmentType: "",
    contractType: "",
    disponibilite: "",
    engagement: "",
    experience: "",
    jobDescription: "",
    jobTitle: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    achievements: "",
    skillsUsed: "",
    skillsTitle: "",
    outil: "",
    skillsDescription: "",
    skillsYears: 0,
    certificat: "",
    skillsTitleTransversal: "",
    skillsDescriptionTransversal: "",
    skillsYearsTransversal: 0,
    title: "",
    file: null,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };


  const handleNext = () => {
    setShowSecondForm(true);
  };

  const handlePrevious = () => {
    setShowSecondForm(false);
  };

  const handleNextToThirdForm = () => {
    setShowThirdForm(true);
  };

  const handlePreviousToSecondForm = () => {
    setShowThirdForm(false);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    for (const key in formData) {
      uploadData.append(key, formData[key]);
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/upload-files",
        uploadData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("File uploaded successfully");
      alert('Votre candidature a bien enregistré')
    } catch (error) {
      setMessage("File upload failed");
    }
  };


  const handleJobTitleChange = (event) => {
    const selectedJobTitle = event.target.value;
    setFormData({ ...formData, jobTitle: selectedJobTitle });

    if (selectedJobTitle === "Stage") {
      setEmploymentTypeOptions(["etude", "alternance", "embauche"]);
      setContractTypeOptions(["interim", "CDD", "CDI"]);
      setDisponibiliteTypeOptions(["remote", "présentiel", "hybride"]);
      setEngagementTypeOptions(["parttime", "fulltime"]);
    } else if (selectedJobTitle === "Travail") {
      setEmploymentTypeOptions(["remote", "parttime", "fulltime"]);
      setContractTypeOptions(["CDI", "CDD", "Freelance"]);
      setDisponibiliteTypeOptions(["remote", "parttime", "fulltime"]);
      setEngagementTypeOptions(["parttime", "fulltime"]);
    } else {
      setEmploymentTypeOptions([]);
      setContractTypeOptions([]);
      setDisponibiliteTypeOptions([]);
      setEngagementTypeOptions([]);
    }
  };


  return (
    <div className="candidature">
      <div className="cand-cont">
        <p>
          <strong>Boostez votre carrière avec Hoag A2I</strong> <br /> Que vous
          soyez en poste, freelance, en reconversion ou à la recherche de votre
          premier emploi, Hoag A2I vous ouvre de nouvelles portes.
        </p>
      </div>

      {!showSecondForm ? (
        <div className="form-container">
          <h5>
            Faites briller votre parcours professionnel en rempliçant cette
            formulaire et déposant votre CV dès maintenant{" "}
          </h5>

          <form onSubmit={handleSubmit}>
            <div>
              <label>Nom:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Prénoms:</label>
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Date de naissance:</label>
              <input
                type="date"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Téléphone:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {!showSecondForm && (
              <button
                type="submit"
                onClick={handleNext}
                className="next-button"
              >
                <IoIosLogIn /> Suivant
              </button>
            )}
          </form>
        </div>
      ) : !showThirdForm ? (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Poste actuel:</label>
              <input
                type="text"
                name="currentPosition"
                value={formData.currentPosition}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Résumez vos realisations en travail:</label>
              <textarea
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
              />
            </div>
            <div>
              <div>
                <label>Poste envisagé:</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                />
              </div>
              <div className="radio-group">
                <label>
                  Stage
                  <br />
                  <input
                    type="radio"
                    name="jobTitle"
                    value="Stage"
                    checked={formData.jobTitle === "Stage"}
                    onChange={handleJobTitleChange}
                  />
                </label>
                <label>
                  Travail
                  <br />
                  <input
                    type="radio"
                    name="jobTitle"
                    value="Travail"
                    checked={formData.jobTitle === "Travail"}
                    onChange={handleJobTitleChange}
                  />
                </label>
              </div>

              {formData.jobTitle && (
                <div className="choice-section">
                  <label>Type d'emploi:</label>
                  <select
                    id="employment-type"
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleChange}
                  >
                    <option value="">Sélectionner...</option>
                    {employmentTypeOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <label>Type de contrat:</label>
                  <select
                    type="text"
                    name="contractType"
                    value={formData.contractType}
                    onChange={handleChange}
                  >
                    <option value="">Sélectionner...</option>
                    {contractTypeOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <label>Disponibilité:</label>
                  <select
                    type="text"
                    name="disponibilite"
                    value={formData.disponibilite}
                    onChange={handleChange}
                  >
                    <option value="">Sélectionner...</option>
                    {disponibiliteTypeOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <label>Engagement:</label>
                  <select
                    type="text"
                    name="engagement"
                    value={formData.engagement}
                    onChange={handleChange}
                  >
                    <option value="">Sélectionner...</option>
                    {engagementTypeOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <label>Décrivez vos attentes pour ce poste envisagé:</label>
            <textarea
              type="text"
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
            />

            <button
              type="button"
              onClick={handlePrevious}
              className="previous-button"
            >
              <IoIosLogIn /> Précédent
            </button>
            <button
              type="submit"
              onClick={handleNextToThirdForm}
              className="next-button"
            >
              <IoIosLogIn /> Suivant
            </button>
          </form>
        </div>
      ) : (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            {/* Contenu du troisième formulaire */}

            <h2>Expériences en travail</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Poste:</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Entreprise:</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Adresse physique:</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="start-date">Date de début</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="end-date">Date de fin</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="achievements">vos réalisations</label>
              <textarea
                type="text"
                name="achievements"
                value={formData.achievements}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="skills-used">
                Enumerez les compétences techniques utilisés
              </label>
              <textarea
                type="text"
                name="skillsUsed"
                value={formData.skillsUsed}
                onChange={handleChange}
              />
            </div>

            <div>
              <h5>Compétence technique</h5>
              <div className="form-group">
                <label htmlFor="skills-title">Nom de la compétence</label>
                <input
                  type="text"
                  name="skillsTitle"
                  value={formData.skillsTitle}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="skills-title">Outils techniques</label>
                <input
                  type="text"
                  name="outil"
                  value={formData.outil}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="skills-description">Description</label>
                <input
                  type="text"
                  name="skillsDescription"
                  value={formData.skillsDescription}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="skills-years">
                  Nombres d'années d'expérience
                </label>
                <input
                  type="number"
                  name="skillsYears"
                  value={formData.skillsYears}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="certificat">Certificats obtenus</label>
                <input
                  type="text"
                  name="certificat"
                  value={formData.certificat}
                  onChange={handleChange}
                />
              </div>
            </div>

            <h5>Compétence Transversale</h5>
            <div className="form-group">
              <label htmlFor="skills-title">Nom de la compétence</label>
              <input
                type="text"
                name="skillsTitleTransversal"
                value={formData.skillsTitleTransversal}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="skills-description">Description</label>
              <input
                type="text"
                name="skillsDescriptionTransversal"
                value={formData.skillsDescriptionTransversal}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="skills-years">
                Nombres d'années d'expérience
              </label>
              <input
                type="number"
                name="skillsYearsTransversal"
                value={formData.skillsYearsTransversal}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>File:</label>
              <input type="file" name="file" onChange={handleFileChange} />
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={handlePreviousToSecondForm}
                className="prev-button"
              >
                <IoIosLogIn /> Précédent
              </button>
              <button type="submit" className="submit-button">
                Soumettre
              </button>
            </div>
          </form>
          {message && <p>{message}</p>}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
