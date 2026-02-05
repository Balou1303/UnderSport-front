import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './context/AuthContext';
import DashboardPage from './pages/DashboardPage';
import UpdateSportPage from './pages/UpdateSportPage';
import AddSportPage from './pages/AddSportPage';
import AdminRoute from './components/AdminRoute';
import { ToastContainer } from 'react-toastify';
import AdminLayout from './components/AdminLayout';
import PublicLayout from './components/PublicLayout';
import DashboardArticles from './pages/DashboardArticles';
import AddArticlePage from './pages/AddArticlePage';
import EditArticlePage from './pages/EditArticlePage';
import RegisterPage from './pages/RegisterPage';
import UserAdminRolePage from './pages/UserAdminRolePage';


function App() {
  return <>
    <AuthProvider>
      <BrowserRouter>

        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          theme="colored"
        />

        <Routes>
          {/* Partie publique */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>


          {/* Partie Admin */}
          <Route path="/admin" element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }>
            <Route path="sports" element={<DashboardPage />} />
            <Route path="sports/add" element={<AddSportPage />} />
            <Route path="sports/edit/:id" element={<UpdateSportPage />} />
            <Route path="articles" element={<DashboardArticles />} />
            <Route path="articles/add" element={<AddArticlePage />} />
            <Route path="articles/edit/:id" element={<EditArticlePage />} />
            <Route path="users" element={<UserAdminRolePage />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </>
}

export default App;