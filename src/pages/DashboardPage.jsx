import { useEffect, useState } from "react";
import sportsServices from "../services/sportsServices";

const DashboardPage = () => {
    const [sports, setSports] = useState([]);

    const fetchSports = async () => {
        try {
            const response = await sportsServices.getAllSports();
            const data = response.data ? response.data : response;
            setSports(data);
        } catch (error) {
            console.error("Erreur lors du chargement :", error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Etes-vous sûr de vouloir supprimer ce sport ?"))
            return;
        try {
            const response = await sportsServices.deleteSport(id);
            setSports(currentSport => currentSport.filter(s => s.sportId !== id));
        } catch (error) {
            console.error("erreur lors de la suppression du sport", error);
        }
    };

    useEffect(() => {
        fetchSports()
    }, []);
    return <>
        <div className="p-4">
            <h1>Dashboard - Gestion des Sports</h1>

            {/* Si la liste est vide, on peut afficher un message */}
            {sports.length === 0 && <p>Chargement...</p>}

            <ul>
                {/* On boucle sur les sports pour les afficher */}
                {sports.map((sport) => (
                    // Chaque élément d'une liste doit avoir une clé unique (key)
                    // Supposons que ton sport ait un ID et un LABEL ou NOM
                    <li key={sport.sportId}>
                        {sport.name}
                        <button 
                onClick={() => handleDelete(sport.sportId)} 
                style={{ color: 'white', backgroundColor: 'red', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}
            >
                Supprimer
            </button>
                    </li>
                ))}
            </ul>
        </div>
    </>;
};

export default DashboardPage;