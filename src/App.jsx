import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import ArticlePage from './pages/ArticlePage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './context/AuthContext';
import DashboardPage from './pages/DashboardPage';
import UpdateSportPage from './pages/UpdateSportPage';
import AddSportPage from './pages/AddSportPage';
import AdminRoute from './components/AdminRoute';
import { ToastContainer } from 'react-toastify';


function App() {
  return <>
    <AuthProvider>
      <BrowserRouter>
        <NavBar />

        <ToastContainer
          position="bottom-right" // En bas à droite
          autoClose={3000}        // Disparaît au bout de 3 sec
          theme="colored"         // Style coloré (Vert/Rouge)
        />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/admin/sports"
            element={
              <AdminRoute>
                <DashboardPage />
              </AdminRoute>
            } />

          <Route path="/admin/sports/edit/:id"
            element={
              <AdminRoute>
                <UpdateSportPage />
              </AdminRoute>} />

          <Route path="/admin/sports/add"
            element={<AdminRoute>
              <AddSportPage />
            </AdminRoute>} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>

  </>
}

export default App;