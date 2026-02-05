import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import articlesService from "../services/articlesService";
import sportsServices from "../services/sportsServices";
import championshipsService from "../services/championshipsService";

const AddArticlePage = () => {
    const navigate = useNavigate();

    // State du formulaire
    const [article, setArticle] = useState({
        title: "",
        content: "",
        idChampionship: "",
        idSport: ""
    });

    // State des listes
    const [sports, setSports] = useState([]);
    const [championships, setChampionships] = useState([]);
    const [picture, setPicture] = useState(null);

    const fetchSports = async () => {
        try {
            const response = await sportsServices.getAllSports();
            setSports(response.data ? response.data : response);
        } catch (error) {
            toast.error("Erreur chargement sports");
        }
    };

    const fetchChampionships = async () => {
        try {
            const response = await championshipsService.getAllChampionships();
            setChampionships(response.data);
        } catch (error) {
            toast.error("Erreur chargement championnats");
        }
    };

    useEffect(() => {
        fetchSports();
        fetchChampionships();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setArticle({ ...article, [name]: value });
    };

    const handlePictureChange = (e) => {
        setPicture(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', article.title);
            formData.append('content', article.content);
            formData.append('idChampionship', article.idChampionship);
            formData.append('sports', article.idSport);

            // La date au format SQL (YYYY-MM-DD HH:mm:ss) OBLIGATOIRE pour l'envoi
            const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
            formData.append('publicationDate', date);

            if (picture) {
                formData.append('image', picture);
            }

            await articlesService.createArticle(formData);
            toast.success("Article publié avec succès ! 🎉");
            navigate("/admin/articles");

        } catch (error) {
            console.error("Erreur API complète :", error);
            if (error.response && error.response.data) {
                console.error("Détails erreur back :", error.response.data);
            }
            toast.error("Erreur lors de la publication");
        }
    };

    return (
        <div className="p-4">
            <h1>Nouvel Article ✍️</h1>
            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label className="form-label">Titre</label>
                    <input type="text" name="title" className="form-control" value={article.title} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Contenu</label>
                    <textarea name="content" className="form-control" rows="5" value={article.content} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Image de l'article</label>
                    <input 
                        type="file" 
                        name="image" 
                        className="form-control" 
                        accept="image/*" // N'accepte que les images
                        onChange={handlePictureChange} 
                    />
                </div>

                {/* Select Sport */}
                <div className="mb-3">
                    <label className="form-label">Sport lié</label>
                    <select name="idSport" className="form-select" onChange={handleChange} required>
                        <option value="">Selectionnez un sport</option>
                        {sports.map(sport => (
                            <option key={sport.sportId} value={sport.sportId}>{sport.name}</option>
                        ))}
                    </select>
                </div>

                {/* Select Championnat */}
                <div className="mb-3">
                    <label className="form-label">Championnat lié</label>
                    <select name="idChampionship" className="form-select" onChange={handleChange}>
                        <option value="">Selectionnez un championnat</option>
                        {championships.map(champ => (
                            <option key={champ.championshipId} value={champ.championshipId}>{champ.name}</option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary mt-3">Publier l'article</button>
            </form>
        </div>
    );
};

export default AddArticlePage;