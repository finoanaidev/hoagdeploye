import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Navbar from './Navbar';
import Login from './auth/Login';
import Register from './auth/Register';
import ListeCandidat from './Candidature/ListeCandidat';
import Offres from './Recrutement/ListeOffre';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/listeCandidat" element={<PrivateRoute><ListeCandidat /></PrivateRoute>} />
          <Route path="/offres" element={<PrivateRoute><Offres /></PrivateRoute>} />
          {/* Add other routes here */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
