import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Important pour ne pas recharger la page

const NavBar = () => {
  return (
    <Navbar expand="lg" className="bg-dark" data-bs-theme="dark">
      <Container>
        {/* LOGO */}
        <Navbar.Brand as={Link} to="/">
            UnderSport 🏀
        </Navbar.Brand>

        {/* BOUTON BURGER (Mobile) */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* LIENS */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* as={Link} transforme le lien Bootstrap en lien React Router */}
            <Nav.Link as={Link} to="/">Accueil</Nav.Link>
            <Nav.Link as={Link} to="/sports">Sports</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            
            {/* Bouton Connexion en violet */}
            <Nav.Link as={Link} to="/login" style={{ color: '#8A5CF5', fontWeight: 'bold' }}>
              Se connecter
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;