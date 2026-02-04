import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
  const navigate = useNavigate();
  // On vérifie l'état au chargement du composant
  const { isConnected, role, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout(); // supprime le token, axios...

    navigate('/login')
  };

  return (
    <Navbar expand="lg" className="bg-dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">UnderSport 🏀</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Accueil</Nav.Link>
            <Nav.Link as={Link} to="/sports">Sports</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>

            {isConnected && role === "admin" && (
              <Nav.Link as={Link} to="/admin/sports">Dashboard</Nav.Link>
            )}
            
            {isConnected ? (
                // CAS A : CONNECTÉ
                <Nav.Link onClick={handleLogout} className="nav-link btn-link auth-link">
                  Se déconnecter
                </Nav.Link>
            ) : (
                // CAS B : PAS CONNECTÉ
                <Nav.Link as={Link} to="/login" className="nav-link auth-link">
                  Se connecter
                </Nav.Link>
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;