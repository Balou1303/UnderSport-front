import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import articlesService from "../services/articlesService";
import sportsServices from "../services/sportsServices";
import championshipsService from "../services/championshipsService";

const EditArticlePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Pour construire l'URL de l'image 
    const API_URL = import.meta.env.VITE_URL_API;
    const SERVER_URL = API_URL ? API_URL.replace('/api', '') : '';

    const [newPicture, setNewPicture] = useState(null);

    // State du formulaire
    const [article, setArticle] = useState({
        title: "",
        content: "",
        picture: "", // L'ancienne URL (texte)
        idChampionship: "",
        idSport: ""
    });

    const [sports, setSports] = useState([]);
    const [championships, setChampionships] = useState([]);

    const fetchAllData = async () => {
        try {
            const sportsResp = await sportsServices.getAllSports();
            setSports(sportsResp.data ? sportsResp.data : sportsResp);

            const champResp = await championshipsService.getAllChampionships();
            setChampionships(champResp.data ? champResp.data : champResp);

            const articleResp = await articlesService.getArticleById(id);
            const articleData = articleResp.data;

            const linkedSportResp = await articlesService.getSportsByArticle(id);
            const currentSportId = (linkedSportResp.data && linkedSportResp.data.length > 0)
                ? linkedSportResp.data[0].sportId
                : "";

            setArticle({
                title: articleData.title,
                content: articleData.content,
                picture: articleData.picture || "",
                idChampionship: articleData.idChampionship || "",
                idSport: currentSportId
            });

        } catch (error) {
            console.error(error);
            toast.error("Erreur lors du chargement des données");
        }
    };

    useEffect(() => {
        fetchAllData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setArticle({ ...article, [name]: value });
    };


    const handlePictureChange = (e) => {
        setNewPicture(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            
            formData.append('title', article.title);
            formData.append('content', article.content);
            formData.append('idChampionship', article.idChampionship);
            formData.append('sports', article.idSport);

            // LOGIQUE IMPORTANTE POUR L'IMAGE
            // Correction : On utilise bien 'newPicture'
            if (newPicture) {
                // CAS 1 : Nouvelle image sélectionnée -> on envoie le fichier
                formData.append('image', newPicture);
            } else {
                // CAS 2 : Pas de changement -> on renvoie l'ancienne URL
                formData.append('picture', article.picture);
            }

            // Correction : On envoie 'formData' (pas dataToSend qui n'existe pas)
            await articlesService.updateArticle(id, formData);

            toast.success("Article modifié avec succès !");
            navigate("/admin/articles");

        } catch (error) {
            console.error(error);
            toast.error("Erreur lors de la modification");
        }
    };

    return (
        <div className="p-4">
            <h1>Modifier l'article #{id} ✏️</h1>
            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label className="form-label">Titre</label>
                    <input type="text" name="title" className="form-control" value={article.title} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Contenu</label>
                    <textarea name="content" className="form-control" rows="5" value={article.content} onChange={handleChange} required />
                </div>

                {/* --- ZONE IMAGE CORRIGÉE --- */}
                <div className="mb-3">
                    <label className="form-label">Image de l'article</label>
                    
                    {/* Prévisualisation de l'image actuelle */}
                    {article.picture && !newPicture && (
                        <div className="mb-2">
                            <p className="small text-muted">Image actuelle :</p>
                            <img 
                                src={`${SERVER_URL}${article.picture}`} 
                                alt="Actuelle" 
                                style={{ width: "150px", objectFit: "cover", borderRadius: "5px" }} 
                            />
                        </div>
                    )}

                    {/* Input TYPE FILE (et pas text) */}
                    <input 
                        type="file" 
                        name="image" 
                        className="form-control" 
                        accept="image/*"
                        onChange={handlePictureChange} 
                    />
                    <div className="form-text">Laisser vide pour conserver l'image actuelle.</div>
                </div>
                {/* --------------------------- */}

                <div className="mb-3">
                    <label className="form-label">Sport lié</label>
                    <select name="idSport" className="form-select" value={article.idSport} onChange={handleChange} required>
                        <option value="">-- Choisir un sport --</option>
                        {sports.map(sport => (
                            <option key={sport.sportId} value={sport.sportId}>{sport.name}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Championnat lié</label>
                    <select name="idChampionship" className="form-select" value={article.idChampionship} onChange={handleChange} >
                        <option value="">-- Choisir un championnat --</option>
                        {championships.map(champ => (
                            <option key={champ.championshipId} value={champ.championshipId}>{champ.name}</option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-warning mt-3">Enregistrer les modifications</button>
            </form>
        </div>
    );
};

export default EditArticlePage;