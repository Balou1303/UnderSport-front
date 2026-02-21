import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import legendsService from "../services/legendsService";
import { toast } from "react-toastify";

const DashboardLegends = () => {
    const [legends, setLegends] = useState([]);
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_URL_API;
    const SERVER_URL = API_URL ? API_URL.replace('/api', '') : '';

    const fetchLegends = async () => {
        try {
            const response = await legendsService.getAllLegends();
            setLegends(response.data);
        } catch (error) {
            console.error(error);
            toast.error("Impossible de charger les légendes");
        }
    };

    const handleDelete = async (id, firstname, lastname) => {
        if (!window.confirm(`Supprimer la légende "${firstname} ${lastname}" ?`)) return;
        try {
            await legendsService.deleteLegend(id);
            setLegends(legends.filter(l => l.legendId !== id));
            toast.success("Légende supprimée avec succès !");
        } catch (error) {
            toast.error("Erreur lors de la suppression");
        }
    };

    useEffect(() => {
        fetchLegends();
    }, []);

    return (
        <div className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Gestion des Légendes</h1>
                <button className="btn btn-primary" onClick={() => navigate('/admin/legends/add')}>
                    + Ajouter une Légende
                </button>
            </div>

            <table className="table table-hover table-bordered shadow-sm bg-white align-middle">
                <thead className="table-dark">
                    <tr>
                        <th>Photo</th>
                        <th>Prénom</th>
                        <th>Nom</th>
                        <th>Sport</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {legends.map((legend) => (
                        <tr key={legend.legendId}>
                            <td style={{ width: "80px" }}>
                                {legend.photo ? (
                                    <img
                                        src={`${SERVER_URL}${legend.photo}`}
                                        alt={legend.lastname}
                                        style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "50%" }}
                                    />
                                ) : (
                                    <div style={{ width: "50px", height: "50px", backgroundColor: "#ccc", borderRadius: "50%" }}></div>
                                )}
                            </td>
                            <td className="fw-bold">{legend.firstname}</td>
                            <td className="fw-bold text-uppercase">{legend.lastname}</td>
                            <td>{legend.sportName}</td>
                            <td style={{ width: '150px' }}>
                                <div className="d-flex gap-2 align-items-center">
                                    <button
                                        className="btn btn-sm btn-warning"
                                        title="Modifier"
                                        onClick={() => navigate(`/admin/legends/edit/${legend.legendId}`)}
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDelete(legend.legendId, legend.firstname, legend.lastname)}
                                        title="Supprimer"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {legends.length === 0 && (
                        <tr>
                            <td colSpan="5" className="text-center py-4 text-muted">
                                Aucune légende enregistrée pour le moment.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DashboardLegends;
