import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
  const navigate = useNavigate();
  // vérifie l'état au chargement du composant
  const { isConnected, role, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout(); // supprime le token, axios...

    navigate('/login')
  };

  return <>
    <Navbar expand="lg" className="customNavbar px-3" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbarBrand" aria-label="UnderSport - Retour à l'accueil">UNDER<span>SPORT</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/" className="navLink">Accueil</Nav.Link>
            <Nav.Link as={Link} to="/matchs" className="navLink">Matchs</Nav.Link>
            <Nav.Link as={Link} to="/encyclopedia" className="navLink">Encyclopédie</Nav.Link>
            <Nav.Link as={Link} to="/legends" className="navLink">Légendes</Nav.Link>

            {isConnected && (role === "admin" || role === "journaliste") && (
              <Nav.Link as={Link} to={role === "admin" ? "/admin" : "/admin/articles"} className="navLink">Dashboard</Nav.Link>
            )}

            {isConnected ? (
              <> {/* ! On met un Fragment <> car on retourne maintenant 2 éléments frères (Profil + Déconnexion) */}
                
                <Nav.Link as={Link} to="/editUser" className="navLink">
                  Mon Profil
                </Nav.Link>
                
                <Nav.Link onClick={handleLogout} className="authButton">
                  Déconnexion
                </Nav.Link>
                
              </>
            ) : (
              <Nav.Link as={Link} to="/login" className="authButton">
                Connexion / Inscription
              </Nav.Link>
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </>;
}

export default NavBar;