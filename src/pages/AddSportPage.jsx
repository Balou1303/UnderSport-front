import { useState } from "react";
import { useNavigate } from "react-router-dom";
import sportsServices from "../services/sportsService";
import { toast } from "react-toastify";

const AddSportPage = () => {
    const navigate = useNavigate();
    const [sport, setSport] = useState({ name: "" });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSport({ ...sport, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await sportsServices.addSport(sport);
            toast.success("Sport ajouté avec succès")
            navigate("/admin/sports");
        } catch (error) {
            toast.error("Impossible d'ajouter le sport");
        }
    };

    return <>
        <div className="p-4">
            <h1>Ajouter un sport</h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nom du sport</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={sport.name || ""}
                        onChange={handleChange}
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
    </>
};

export default AddSportPage;