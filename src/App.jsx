import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar'; // Assure-toi que le fichier existe

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      {/* 2. Les Routes changent le contenu en dessous */}
      <div style={{ marginTop: "20px" }}> {/* Petit espace pour pas que ça colle */}
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;