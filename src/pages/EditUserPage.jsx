import { useContext, useEffect, useState } from "react";
import usersService from "../services/usersService";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const EditUserPage = () => {
    const [editUser, setEditUser] = useState();
    const [editPassword, setEditPassword] = useState();
    const { user } = useContext(AuthContext);

    const fetchEditUser = async () => {
        if (user && user.id) {
            try {
                const response = await usersService.getUserById(user.id);
                setEditUser(response.data);
            } catch (error) {
                console.error("Erreur de récupération de l'utilisateur :", error);
                toast.error("Impossible de charger l'utilisateur");
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditUser({ ...editUser, [name]: value });
    }

    const handleChangePassword = (e) => {
        const { name, value } = e.target;
        setEditPassword({ ...editPassword, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await usersService.updateUser(editUser);
            toast.success("Utilisateur modifié avec succès");
        } catch (error) {
            console.error("Erreur de modification de l'utilisateur :", error);
            toast.error("Impossible de modifier l'utilisateur");
        }
    };

    const handleSubmitPassword = async (e) => {
        e.preventDefault();
        try {
            await usersService.updatePassword(user.id, editPassword.password);
            toast.success("Mot de passe modifié avec succès");
        } catch (error) {
            console.error("Erreur de modification du mot de passe :", error);
            toast.error("Impossible de modifier le mot de passe");
        }
    };

    useEffect(() => {
        fetchEditUser();
    }, [user]);

    return (
        <div className="container mt-5">
            <h1>Mon Profil</h1>

            {/* Si editUser n'existe pas encore, affiche un chargement */}
            {!editUser ? (
                <p>Chargement du profil...</p>
            ) : (
                <>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label>Pseudo</label>
                            <input
                                type="text"
                                className="form-control"
                                name="nickname"
                                value={editUser.nickname || ""}
                                onChange={handleChange}
                            />
                            <label>Email</label>
                            <input
                                type="text"
                                className="form-control"
                                name="email"
                                value={editUser.email || ""}
                                onChange={handleChange}
                            />
                            <label>Prénom</label>
                            <input
                                type="text"
                                className="form-control"
                                name="firstName"
                                value={editUser.firstName || ""}
                                onChange={handleChange}
                            />
                            <label>Nom</label>
                            <input
                                type="text"
                                className="form-control"
                                name="lastName"
                                value={editUser.lastName || ""}
                                onChange={handleChange}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary mt-3">
                            Enregistrer les modifications
                        </button>
                    </form>

                    <hr className="my-5" />

                    <h2>Modifier le mot de passe</h2>
                    <form onSubmit={handleSubmitPassword}>
                        <div className="mb-3">
                            <label>Nouveau mot de passe</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={editPassword?.password || ""}
                                onChange={handleChangePassword}
                            />
                            <button type="submit" className="btn btn-warning mt-3">
                                Changer le mot de passe
                            </button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
}

export default EditUserPage;