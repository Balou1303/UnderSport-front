import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
    return <>
        <footer className="bg-dark text-light py-4 mt-auto" data-bs-theme="dark">
            <Container>
                <Row className="gy-4 justify-content-between">
                    {/* Section 1 : À propos */}
                    <Col md={12} lg={4}>
                        <h5 className="fw-bold mb-3 text-uppercase text-white">UnderSport 🏀</h5>
                        <p className="text-white-50">
                            Votre plateforme "tout-en-un" dédiée à l'actualité et à la culture sportive.
                            Restez informés, découvrez l'histoire du sport et ne manquez plus aucun match.
                        </p>
                    </Col>

                    {/* Section 2 : Navigation rapide */}
                    <Col md={6} lg={3}>
                        <h5 className="fw-bold mb-3 text-uppercase text-white">Navigation</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2"><Link to="/" className="text-white-50 text-decoration-none footerLink" aria-label="Retour à l'accueil">Accueil</Link></li>
                            <li className="mb-2"><Link to="/sports" className="text-white-50 text-decoration-none footerLink" aria-label="Découvrir tous les sports">Tous les Sports</Link></li>
                            <li className="mb-2"><Link to="/contact" className="text-white-50 text-decoration-none footerLink" aria-label="Nous contacter">Contact</Link></li>
                            <li className="mb-2"><Link to="/login" className="text-white-50 text-decoration-none footerLink" aria-label="Accès espace rédacteur">Espace Rédacteur</Link></li>
                        </ul>
                    </Col>

                    {/* Section 3 : Légal */}
                    <Col md={6} lg={3}>
                        <h5 className="fw-bold mb-3 text-uppercase text-white">Informations Légales</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2"><Link to="/mentions-legales" className="text-white-50 text-decoration-none footerLink">Mentions Légales</Link></li>
                            <li className="mb-2"><Link to="/politique-confidentialite" className="text-white-50 text-decoration-none footerLink">Politique de Confidentialité</Link></li>
                            <li className="mb-2"><Link to="/cgu" className="text-white-50 text-decoration-none footerLink">CGU</Link></li>
                        </ul>
                    </Col>
                </Row>

                <hr className="border-secondary mt-4 mb-3" />

                {/* Copyright */}
                <Row>
                    <Col className="text-center text-white-50 small">
                        &copy; {new Date().getFullYear()} UnderSport - Tous droits réservés. Projet DWWM.
                    </Col>
                </Row>
            </Container>
        </footer>
    </>;
};

export default Footer;
