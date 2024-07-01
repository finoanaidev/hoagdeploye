


const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Connexion à la base de données
connectDB();

// Configuration de CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Remplacez par l'origine de votre frontend
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Middleware
app.use(bodyParser.json());
app.use("/files", express.static("files"));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/recrutements', require('./routes/recrutementRoutes'));
app.use('/api', require('./routes/candidatureRoutes')); // Inclure les routes de candidature

// route admin
app.use('/api', require('./routes/adminRoutes'));

const pdfRoutes = require("./routes/pdfRoutes");
app.use("/", pdfRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));