import { useEffect, useState } from "react";
import sportsServices from "../services/sportsServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DashboardPage = () => {
    const [sports, setSports] = useState([]);
    const navigate = useNavigate()

    const fetchSports = async () => {
        try {
            const response = await sportsServices.getAllSports();
            const data = response.data ? response.data : response;
            setSports(data);
        } catch (error) {
            console.error("Erreur lors du chargement :", error);
        }
    };

    const handleDelete = async (id, sportName) => {
        if (!window.confirm(`Etes-vous sûr de vouloir supprimer "${sportName}" ?`))
            return;
        try {
            const response = await sportsServices.deleteSport(id);
            setSports(currentSport => currentSport.filter(s => s.sportId !== id));
            toast.success(`Le sport "${sportName}" a été supprimé ! 🗑️`);
        } catch (error) {
            toast.error(`Erreur lors de la suppression de ${sportName}`);
        }
    };

    const handleEdit = async (id) => {
        navigate(`/admin/sports/edit/${id}`)
    }

    useEffect(() => {
        fetchSports()
    }, []);

    return <>
        <div className="p-4">
            <h1> Gestion des Sports</h1>

            {sports.length === 0 && <p>Chargement...</p>}

            <ul className="list-group mt-3">
                {sports.map((sport) => (
                    <li
                        key={sport.sportId}
                        className="list-group-item d-flex justify-content-between align-items-center"
                    >

                        {/* Le Nom du sport (à gauche) */}
                        <span className="fw-bold">{sport.name}</span>

                        {/* Le Groupe de Boutons (à droite) */}
                        <div style={{ display: 'flex', gap: '10px' }}>

                            {/* Bouton Edit */}
                            <button
                                onClick={() => handleEdit(sport.sportId)}
                                className="btn btn-warning btn-sm"
                            >
                                Modifier ✏️
                            </button>

                            {/* Bouton delete */}
                            <button
                                onClick={() => handleDelete(sport.sportId, sport.name)}
                                className="btn btn-danger btn-sm"
                            >
                                Supprimer 🗑️
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Bouton add */}
            <button
                className="btn d-flex mt-4"
                style={{ backgroundColor: '#8A5CF5', color: 'white' }}
                onClick={() => navigate("/admin/sports/add")}
            >Ajouter un sport</button>
        </div>
    </>;
};

export default DashboardPage;