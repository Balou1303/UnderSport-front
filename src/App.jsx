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
import SportsAdmin from './pages/SportAdminPage';
import DashBoardChampionship from './pages/DashboardChampionships';
import AddChampionship from './pages/AddChampionship';
import EditChampionship from './pages/EditChampionship';
import DashboardLegends from './pages/DashboardLegends';
import AddLegendPage from './pages/AddLegendPage';
import LegendsPage from './pages/LegendsPage';
import EditLegendPage from './pages/EditLegendPage';
import LegendDetailsPage from './pages/LegendDetailsPage';
import DashboardAchievements from './pages/DashboardAchievements';
import MatchsPage from './pages/MatchsPage';
import EncyclopediaPage from './pages/EncyclopediaPage';
import SportEncyclopediaPage from './pages/SportEncyclopediaPage';
import LexiconPage from './pages/LexiconPage';
import DashboardEncyclopedia from './pages/DashboardEncyclopedia';
import AddRulePage from './pages/AddRulePage';
import AddLexiconPage from './pages/AddLexiconPage';
import EditRulePage from './pages/EditRulePage';
import EditLexiconPage from './pages/EditLexiconPage';
import EditUserPage from './pages/EditUserPage';

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
            <Route path="/legends" element={<LegendsPage />} />
            <Route path="/legends/:id" element={<LegendDetailsPage />} />
            <Route path="/matchs" element={<MatchsPage />} />
            <Route path="/encyclopedia" element={<EncyclopediaPage />} />
            <Route path="/encyclopedia/sport/:id" element={<SportEncyclopediaPage />} />
            <Route path="/encyclopedia/lexicon" element={<LexiconPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="editUser" element={<EditUserPage />} />
          </Route>


          {/* Partie Admin */}
          <Route path="/admin" element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }>
            <Route index element={<DashboardPage />} />
            <Route path="sports" element={<SportsAdmin />} />
            <Route path="sports/add" element={<AddSportPage />} />
            <Route path="sports/edit/:id" element={<UpdateSportPage />} />
            <Route path="articles" element={<DashboardArticles />} />
            <Route path="articles/add" element={<AddArticlePage />} />
            <Route path="articles/edit/:id" element={<EditArticlePage />} />
            <Route path="users" element={<UserAdminRolePage />} />
            <Route path="championships" element={<DashBoardChampionship />} />
            <Route path="championships/add" element={<AddChampionship />} />
            <Route path="championships/edit/:id" element={<EditChampionship />} />
            <Route path="legends" element={<DashboardLegends />} />
            <Route path="legends/add" element={<AddLegendPage />} />
            <Route path="legends/edit/:id" element={<EditLegendPage />} />
            <Route path="achievements" element={<DashboardAchievements />} />
            <Route path="encyclopedia" element={<DashboardEncyclopedia />} />
            <Route path="encyclopedia/rules/add" element={<AddRulePage />} />
            <Route path="encyclopedia/rules/edit/:id" element={<EditRulePage />} />
            <Route path="encyclopedia/lexicon/add" element={<AddLexiconPage />} />
            <Route path="encyclopedia/lexicon/edit/:id" element={<EditLexiconPage />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </>
}

export default App;