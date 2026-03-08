import { useState, useEffect, } from "react";
import { useNavigate } from "react-router-dom";
import championshipsService from "../services/championshipsService";
import sportsService from "../services/sportsService";
import { toast } from "react-toastify";

const AddChampionship = () => {
    const [name, setName] = useState("");
    const [idSport, setIdSport] = useState("");
    const [logo, setLogo] = useState(null);
    const [preview, setPreview] = useState(null);
    const [sports, setSports] = useState([]);
    const navigate = useNavigate();

    const fetchSports = async () => {
        try {
            const response = await sportsService.getAllSports();
            const data = response.data ? response.data : response;
            setSports(data);
        } catch (error) {
            toast.error("Erreur chargement des sports");
        }
    };

    // Gestion de l'image
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setLogo(file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("idSport", idSport);
        if (logo) formData.append("image", logo);

        try {
            await championshipsService.addChampionship(formData);
            toast.success("Championnat créé !");
            navigate("/admin/championships");
        } catch (error) {
            console.error(error);
            // Si le backend renvoie 409 (Doublon), on l'affiche
            if (error.response && error.response.status === 409) {
                toast.warning("Ce championnat existe déjà pour ce sport !");
            } else {
                toast.error("Erreur lors de la création");
            }
        }
    };

    useEffect(() => {
        fetchSports();
    }, []);

    return <>
        <div className="container p-4">
            <h1 className="mb-4">Nouveau Championnat</h1>

            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label className="form-label">Nom du championnat</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Ex: Ligue 1"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Sport associé</label>
                    <select
                        className="form-select"
                        value={idSport}
                        onChange={(e) => setIdSport(e.target.value)}
                        required
                    >
                        <option value="">-- Choisir un sport --</option>
                        {sports.map((sport) => (
                            <option key={sport.sportId} value={sport.sportId}>
                                {sport.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Logo</label>
                    <input
                        type="file"
                        className="form-control"
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                    {preview && (
                        <div className="mt-2">
                            <img src={preview} alt="Aperçu" style={{ maxHeight: "100px" }} className="img-thumbnail" />
                        </div>
                    )}
                </div>

                <button type="submit" className="btn btn-primary">Créer</button>
            </form>
        </div>
    </>;
};

export default AddChampionship;