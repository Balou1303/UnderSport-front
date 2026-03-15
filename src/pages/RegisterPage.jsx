import { useState } from "react";
import { useNavigate } from "react-router-dom";
import usersService from "../services/usersService";
import { toast } from "react-toastify";

const RegisterPage = () => {
    const [user, setUser] = useState({
        nickname: "",
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        picture: "",
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!user.nickname) {
                return toast.error('Un pseudo est obligatoire')
            }

            if (!user.email) {
                return toast.error('L\'email est obligatoire')
            }

            if (!user.password) {
                return toast.error('Le mot de passe est obligatoire')
            }
            if (!user.confirmPassword) {
                return toast.error('La confirmation de mot de passe est obligatoire')
            }

            if (user.password !== user.confirmPassword) {
                return toast.error('Les mots de passe doivent correspondre')
            }

            const response = await usersService.createUser(user);
            toast.success("Inscription réussie");
            navigate("/login");
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }
    }
    return <>
        <div className="container mt-5 py-5 glassCard rounded-4 border" style={{ maxWidth: '550px' }}>
            <h2 className="mb-4 text-center fw-bold">S'inscrire sur <span className="textPrimary">UnderSport</span></h2>
            <form onSubmit={handleSubmit}>

                {/* Pseudo */}
                <div className="mb-3">
                    <label className="form-label">Pseudo*</label>
                    <input
                        type="text"
                        name="nickname"
                        className="form-control"
                        value={user.nickname}
                        onChange={handleChange}
                    />
                </div>

                {/* Prénom & Nom (sur la même ligne pour le style) */}
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Prénom</label>
                        <input type="text" name="firstName" className="form-control" value={user.firstName} onChange={handleChange} />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Nom</label>
                        <input type="text" name="lastName" className="form-control" value={user.lastName} onChange={handleChange} />
                    </div>
                </div>

                {/* Email */}
                <div className="mb-3">
                    <label className="form-label">Email*</label>
                    <input type="email" name="email" className="form-control" value={user.email} onChange={handleChange} />
                </div>

                {/* Mots de passe */}
                <div className="mb-3">
                    <label className="form-label">Mot de passe*</label>
                    <input type="password" name="password" className="form-control" value={user.password} onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Confirmer le mot de passe*</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        className="form-control"
                        value={user.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                {/* Bouton */}
                <button type="submit" className="btn btn-primary w-100 mt-3">S'inscrire</button>
            </form>
        </div>
    </>;
}

export default RegisterPage;