import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import articlesService from "../services/articlesService";
import sportsServices from "../services/sportsService";
import championshipsService from "../services/championshipsService";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';


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
            setSports(response.data);
        } catch (error) {
            toast.error("Erreur chargement sports");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setArticle({ ...article, [name]: value });
    };

    const handleContentChange = (value) => {
        setArticle(prev => ({ ...prev, content: value }));
    };

    const handleSportChange = async (e) => {
        const sportId = e.target.value;
        setArticle(prev => ({ ...prev, idSport: sportId, idChampionship: "" }));
        setChampionships([]);

        if (sportId) {
            try {
                const response = await championshipsService.getChampionshipsBySport(sportId);
                setChampionships(response.data);
            } catch (error) {
                console.error(error);
                toast.error("Impossible de charger les championnats liés");
            }
        }
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
            formData.append('idSport', article.idSport);

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

    useEffect(() => {
        fetchSports();
    }, []);

    return <>
        <div className="p-4">
            <h1>Nouvel Article ✍️</h1>
            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label className="form-label">Titre</label>
                    <input type="text" name="title" className="form-control" value={article.title} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Contenu de l'article</label>
                    <ReactQuill
                        theme="snow"
                        value={article.content}
                        onChange={handleContentChange}
                        style={{ height: '300px', marginBottom: '50px' }}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Image de l'article</label>
                    <input type="file" className="form-control" accept="image/*" onChange={handlePictureChange} />
                </div>

                <div className="row">
                    {/* Select Sport */}
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Sport lié</label>
                        <select
                            name="idSport"
                            className="form-select"
                            value={article.idSport}
                            onChange={handleSportChange}
                            required
                        >
                            <option value="">Selectionnez un sport</option>
                            {sports.map(sport => (
                                <option key={sport.sportId} value={sport.sportId}>{sport.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Select Championnat */}
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Championnat</label>
                        <select
                            name="idChampionship" // Important pour le handleChange
                            className="form-select"
                            value={article.idChampionship}
                            onChange={handleChange} // Ici un handleChange classique suffit
                            disabled={!article.idSport}
                        >
                            <option value="">
                                {!article.idSport ? "-- Sélectionnez un sport d'abord --" : "-- Choisir un championnat --"}
                            </option>
                            {championships.map(c => (
                                <option key={c.championshipId} value={c.championshipId}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary mt-3">Publier l'article</button>
            </form>
        </div>
    </>
};

export default AddArticlePage;