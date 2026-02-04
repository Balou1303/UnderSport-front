import { Outlet } from 'react-router-dom';
import NavBar from './NavBar'; // On déplace la NavBar ici

const PublicLayout = () => {
    return (
        <>
            {/* La NavBar ne s'affichera que dans ce Layout */}
            <NavBar />
            
            {/* Le contenu de la page (Home, Article, etc.) */}
            <Outlet />
        </>
    );
};

export default PublicLayout;