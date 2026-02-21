import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import championshipsService from "../services/championshipsService";

const DashBoardChampionship = () => {
    const [championships, setChampionship] = useState([]);
    const navigate = useNavigate()

    const API_URL = import.meta.env.VITE_URL_API;
    const SERVER_URL = API_URL ? API_URL.replace('/api', '') : '';

    const fetchChampionships = async () => {
        try {
            const response = await championshipsService.getAllChampionships();
            setChampionship(response.data)
        } catch (error) {
            console.error(error);
            toast.error("Impossible de charger les championnats")
        }
    };

    const handleDelete = async (id, name) => {
        if (!window.confirm(`Etes-vous sur de vouloir supprimmer le championnat "${name}" ?`))
            return;

        try {
            await championshipsService.deleteChampionship(id);
            //Mise à jour visuelle immédiate (retire l'élément de la liste)
            setChampionship(championships.filter(c => c.championshipId !== id));
            toast.success("Championnat supprimé !");
        } catch (error) {
            toast.error("Erreur lors de la suppression");
        }
    }

    useEffect(() => {
        fetchChampionships();
    }, [])


    return <>
        <div className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Gestion des Championnats</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate('/admin/championships/add')}
                >
                    + Nouveau Championnat
                </button>
            </div>

            <table className="table table-hover table-bordered shadow-sm bg-white">
                <thead className="table-dark">
                    <tr>
                        <th className="text-center">Logo</th>
                        <th>Nom</th>
                        <th>Sport lié</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {championships.map((champ) => (
                        <tr key={champ.championshipId}>
                            {/* Logo */}
                            <td className="text-center" style={{ width: "100px" }}>
                                {champ.logo ? (
                                    <img
                                        src={`${SERVER_URL}${champ.logo}`}
                                        alt={champ.name}
                                        style={{ height: "40px", objectFit: "contain" }}
                                    />
                                ) : (
                                    <span className="text-muted small">Aucun</span>
                                )}
                            </td>

                            {/* Nom */}
                            <td className="align-middle fw-bold">{champ.name}</td>

                            {/* Sport */}
                            <td className="align-middle">
                                <span className="badge bg-info text-dark">
                                    {champ.sportName || "Inconnu"}
                                </span>
                            </td>

                            {/* Actions */}
                            <td className="text-center align-middle" style={{ width: '150px' }}>
                                <button
                                    className="btn btn-sm btn-warning me-2"
                                    onClick={() => navigate(`/admin/championships/edit/${champ.championshipId}`)}
                                    title="Modifier"
                                >
                                    ✏️
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDelete(champ.championshipId, champ.name)}
                                    title="Supprimer"
                                >
                                    🗑️
                                </button>
                            </td>
                        </tr>
                    ))}

                    {championships.length === 0 && (
                        <tr>
                            <td colSpan="4" className="text-center p-4 text-muted">
                                Aucun championnat trouvé. Commencez par en créer un !
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

    </>;
}

export default DashBoardChampionship;