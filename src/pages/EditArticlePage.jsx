import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import articlesService from "../services/articlesService";
import sportsServices from "../services/sportsServices";
import championshipsService from "../services/championshipsService";

const EditArticlePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // State du formulaire
    const [article, setArticle] = useState({
        title: "",
        content: "",
        picture: "",
        idChampionship: "",
        idSport: ""
    });

    // States des listes déroulantes
    const [sports, setSports] = useState([]);
    const [championships, setChampionships] = useState([]);

    const fetchAllData = async () => {
        try {
            // charge les listes Sports & Championnats
            const sportsResp = await sportsServices.getAllSports();
            setSports(sportsResp.data ? sportsResp.data : sportsResp);

            const champResp = await championshipsService.getAllChampionships();
            setChampionships(champResp.data ? champResp.data : champResp);
            console.log(champResp);
            

            // charge l'article à modifier
            const articleResp = await articlesService.getArticleById(id);
            const articleData = articleResp.data;

            // C. ASTUCE : On charge le sport lié à cet article pour pré-remplir le select
            // (Car l'article seul ne contient pas forcément l'info du sport)
            const linkedSportResp = await articlesService.getSportsByArticle(id);

            // Si un sport est lié, on prend son ID, sinon chaîne vide
            const currentSportId = (linkedSportResp.data && linkedSportResp.data.length > 0)
                ? linkedSportResp.data[0].sportId
                : "";

            //  met tout dans le formulaire
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataToSend = {
                title: article.title,
                content: article.content,
                picture: article.picture,
                idChampionship: parseInt(article.idChampionship),
                sports: [parseInt(article.idSport)]
            };

            await articlesService.updateArticle(id, dataToSend);

            toast.success("Article modifié avec succès ! 💾");
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

                <div className="mb-3">
                    <label className="form-label">Image (URL)</label>
                    <input type="text" name="picture" className="form-control" value={article.picture} onChange={handleChange} />
                </div>

                {/* Select sport */}
                <div className="mb-3">
                    <label className="form-label">Sport lié</label>
                    <select name="idSport" className="form-select" value={article.idSport} onChange={handleChange} required>
                        <option value="">-- Choisir un sport --</option>
                        {sports.map(sport => (
                            <option key={sport.sportId} value={sport.sportId}>{sport.name}</option>
                        ))}
                    </select>
                </div>

                {/* Select championnat */}
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