import { useState, useEffect } from "react";
import achievementsService from "../services/achievementsService";
import { toast } from "react-toastify";

const DashboardAchievements = () => {
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);

    // States pour l'ajout / édition
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ achievementId: "", label: "", type: "collective" });

    const fetchAchievements = async () => {
        try {
            const res = await achievementsService.getAllAchievements();
            setAchievements(res.data);
            setLoading(false);
        } catch (error) {
            toast.error("Erreur lors de la récupération des palmarès");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAchievements();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await achievementsService.updateAchievement(formData.achievementId, { label: formData.label, type: formData.type });
                toast.success("Palmarès modifié avec succès");
            } else {
                await achievementsService.createAchievement({ label: formData.label, type: formData.type });
                toast.success("Palmarès ajouté avec succès");
            }
            fetchAchievements();
            setFormData({ achievementId: "", label: "", type: "collective" });
            setIsEditing(false);
        } catch (error) {
            toast.error(isEditing ? "Erreur lors de la modification" : "Erreur lors de la création");
        }
    };

    const handleEdit = (ach) => {
        setIsEditing(true);
        setFormData({ achievementId: ach.achievementId, label: ach.label, type: ach.type || "collective" });
        window.scrollTo(0, 0);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setFormData({ achievementId: "", label: "", type: "collective" });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce palmarès ? Attention, il sera retiré de toutes les légendes associées.")) {
            return;
        }
        try {
            await achievementsService.deleteAchievement(id);
            toast.success("Palmarès supprimé");
            fetchAchievements();
        } catch (error) {
            toast.error("Erreur lors de la suppression");
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'individual': return "badge bg-warning text-dark";
            case 'honorary': return "badge bg-info text-dark";
            default: return "badge bg-primary";
        }
    };

    const getTypeLabel = (type) => {
        switch (type) {
            case 'individual': return "🥇 Individuel";
            case 'honorary': return "⭐ Mention";
            default: return "🏆 Équipe";
        }
    };

    if (loading) return <div className="text-center mt-5"><h4>Chargement...</h4></div>;

    return (
        <div className="container mt-4">
            <h1 className="mb-4" >Gestion des Palmarès</h1>

            {/* Formulaire d'ajout / modification */}
            <div className="card shadow-sm mb-5 border-0">
                <div className="card-header bg-dark text-white fw-bold">
                    {isEditing ? "Modifier un Palmarès" : "Ajouter un nouveau Palmarès"}
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit} className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Nom du trophée / titre</label>
                            <input
                                type="text"
                                className="form-control"
                                name="label"
                                value={formData.label}
                                onChange={handleChange}
                                placeholder="Ex: Ballon d'Or"
                                required
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Type</label>
                            <select
                                className="form-select"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                            >
                                <option value="collective">🏆 Équipe</option>
                                <option value="individual">🥇 Individuel</option>
                                <option value="honorary">⭐ Mention honorifique</option>
                            </select>
                        </div>
                        <div className="col-md-2 d-flex align-items-end">
                            <button type="submit" className="btn btn-primary w-100">
                                {isEditing ? "Mettre à jour" : "Ajouter"}
                            </button>
                        </div>
                    </form>
                    {isEditing && (
                        <div className="mt-2 text-end">
                            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleCancelEdit}>
                                Annuler la modification
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Liste des palmarès */}
            <div className="card shadow-sm border-0">
                <div className="card-header bg-white fw-bold text-dark d-flex justify-content-between align-items-center">
                    <span>Tous les trophées enregistrés</span>
                    <span className="badge bg-secondary">{achievements.length} trophées</span>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover table-striped mb-0 align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>ID</th>
                                    <th>Nom du Palmarès</th>
                                    <th>Catégorie</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {achievements.length > 0 ? (
                                    achievements.map((ach) => (
                                        <tr key={ach.achievementId}>
                                            <td className="text-muted">#{ach.achievementId}</td>
                                            <td className="fw-bold">{ach.label}</td>
                                            <td>
                                                <span className={getTypeColor(ach.type)}>
                                                    {getTypeLabel(ach.type)}
                                                </span>
                                            </td>
                                            <td className="text-end">
                                                <button
                                                    className="btn btn-warning btn-sm me-2"
                                                    onClick={() => handleEdit(ach)}
                                                    title="Modifier"
                                                >
                                                    ✏️
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDelete(ach.achievementId)}
                                                    title="Supprimer"
                                                >
                                                    🗑️
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center py-4 text-muted">
                                            Aucun palmarès n'est enregistré dans la base de données.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardAchievements;
