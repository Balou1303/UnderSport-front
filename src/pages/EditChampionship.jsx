import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import championshipsService from "../services/championshipsService";
import sportsService from "../services/sportsService";
import { toast } from "react-toastify";

const EditChampionship = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [idSport, setIdSport] = useState("");
    const [logo, setLogo] = useState(null); // Nouveau fichier
    const [preview, setPreview] = useState(null); // Aperçu (ancien ou nouveau)
    const [sports, setSports] = useState([]);

    // Pour afficher l'ancienne image correctement
    const API_URL = import.meta.env.VITE_URL_API;
    const SERVER_URL = API_URL ? API_URL.replace('/api', '') : '';

    // Charge les données (Sports + Le Championnat à modifier)
    const loadData = async () => {
        try {
            // Charge les sports
            const sportsRes = await sportsService.getAllSports();
            setSports(sportsRes.data ? sportsRes.data : sportsRes);

            // Charge le championnat
            const champRes = await championshipsService.getChampionshipById(id);
            const data = champRes.data ? champRes.data : champRes;

            setName(data.name);
            setIdSport(data.idSport);

            // Gère l'aperçu de l'image existante
            if (data.logo) {
                setPreview(`${SERVER_URL}${data.logo}`);
            }
        } catch (error) {
            toast.error("Erreur chargement des données");
            navigate("/admin/championships");
        }
    };


    // Gestion du nouveau fichier
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
        // On n'ajoute 'logo' que si l'utilisateur a choisi un nouveau fichier
        if (logo) formData.append("image", logo);

        try {
            await championshipsService.updateChampionship(id, formData);
            toast.success("Championnat mis à jour !");
            navigate("/admin/championships");
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 409) {
                toast.warning("Nom déjà pris pour ce sport !");
            } else {
                toast.error("Erreur lors de la modification");
            }
        }
    };

    useEffect(() => {
        loadData();
    }, [id, navigate]);

    return <>
        <div className="container p-4">
            <h1 className="mb-4">Modifier le Championnat</h1>

            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label className="form-label">Nom</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Sport</label>
                    <select
                        className="form-select"
                        value={idSport}
                        onChange={(e) => setIdSport(e.target.value)}
                        required
                    >
                        <option value="">-- Choisir --</option>
                        {sports.map((s) => (
                            <option key={s.sportId} value={s.sportId}>{s.name}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Logo (Laisser vide pour garder l'actuel)</label>
                    <input
                        type="file"
                        className="form-control"
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                    {preview && (
                        <div className="mt-2">
                            <p className="small text-muted">Aperçu :</p>
                            <img src={preview} alt="Aperçu" style={{ maxHeight: "100px" }} className="img-thumbnail" />
                        </div>
                    )}
                </div>

                <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-warning">Mettre à jour</button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate("/admin/championships")}>Annuler</button>
                </div>
            </form>
        </div>
    </>;
};

export default EditChampionship;