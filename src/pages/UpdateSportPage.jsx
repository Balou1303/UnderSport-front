import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // useParams pour lire l'ID dans l'URL
import sportsServices from "../services/sportsService";
import { toast } from "react-toastify";

const UpdateSportPage = () => {
    // On récupère l'ID depuis l'URL (ex: /edit/3 -> id = 3)
    const { id } = useParams();
    const navigate = useNavigate();
    const [sport, setSport] = useState({ name: "" });

    const fetchSport = async () => {
        try {
            const response = await sportsServices.getSportById(id);
            setSport(response.data);
        } catch (error) {
            console.error("Erreur chargement sport", error);
        }
    };

    // Gérer la saisie dans l'input
    const handleChange = (event) => {
        const { name, value } = event.target;
        // On garde l'ancien sport (...sport) et on modifie juste le champ qui change
        setSport({ ...sport, [name]: value });
    };

    // Envoyer le formulaire (UPDATE)
    const handleSubmit = async (e) => {
        e.preventDefault(); // On bloque le rechargement de page
        try {
            const response = await sportsServices.updateSport(id, sport);
            toast.success("Sport modifié avec succès")
            navigate("/admin/sports");
        } catch (error) {
            toast.error("Le sport n'a pas été modifié");
        }
    };

    useEffect(() => {
        fetchSport();
    }, []);

    return <>
        <div className="p-4">
            <h1>Modifier le sport</h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nom du sport</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={sport.name || ""} // La valeur vient du State
                        onChange={handleChange} // Chaque lettre tape met à jour le State
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="rulesDescription" className="form-label">Description générale des règles</label>
                    <textarea
                        id="rulesDescription"
                        name="rulesDescription"
                        className="form-control"
                        rows="5"
                        value={sport.rulesDescription || ""}
                        onChange={handleChange}
                        placeholder="Une brève introduction aux règles de ce sport..."
                    ></textarea>
                </div>
                <div className="d-flex gap-3 mt-3">
                    <button type="submit" className="btn btn-primary">Valider</button>
                    <button
                        type="button"
                        onClick={() => navigate("/admin/sports")}
                        className="btn btn-secondary"
                    >
                        Retour
                    </button>
                </div>
            </form>
        </div>
    </>;
};

export default UpdateSportPage;