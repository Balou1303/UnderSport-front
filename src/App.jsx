import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar'; // Assure-toi que le fichier existe
import ArticlePage from './pages/ArticlePage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;