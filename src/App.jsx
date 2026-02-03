import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import ArticlePage from './pages/ArticlePage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './context/AuthContext';
import DashboardPage from './pages/DashboardPage';
import UpdateSportPage from './pages/UpdateSportPage';


function App() {
  return <>
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin/sports" element={<DashboardPage />} />
          <Route path="/admin/sports/edit/:id" element={<UpdateSportPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>

  </>
}

export default App;