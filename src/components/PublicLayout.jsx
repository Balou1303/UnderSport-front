import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

const PublicLayout = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            {/* La NavBar en haut */}
            <NavBar />

            {/* Le contenu (qui prend tout l'espace restant) */}
            <main className="flex-grow-1 mb-5">
                <Outlet />
            </main>

            {/* Le Footer toujours repoussé en bas */}
            <Footer />
        </div>
    );
};

export default PublicLayout;