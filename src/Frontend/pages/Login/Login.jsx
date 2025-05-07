import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationModal from "../../components/NotificationModal/NotificationModal";
import "./Login.css";

const URL = import.meta.env.VITE_BACKEND_URL;

function Login() {
    const navigate = useNavigate();
    const [showNotification, setShowNotification] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        roles: ["USER"]
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const res = await fetch(URL + "/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!data.token) {
                throw new Error("Error al login");
                navigate("/login");
                console.error(res.statusText);
            }
            localStorage.setItem("access_token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            setShowSuccess(true);
            navigate("/");
            return;
        } catch (err) {
            console.error(err);
            setShowNotification(true);
            navigate("/login");
            return;
        }
    };

    return (
        <>  
            {showSuccess && (
                <NotificationModal
                    text="Registro exitoso"
                    show={showSuccess}
                    onClose={() => setShowSuccess(false)}
                    type="success"
                    duration={3000}
                    position="top-center"
                />
            )}
            {showNotification && (
                <NotificationModal
                    text="Error al hacer login"
                    show={showNotification}
                    onClose={() => setShowNotification(false)}
                    type="error"
                    duration={5000}
                    position="top-center"
                />
            )}
            <div className="form-body">
                <div className="container-form">
                    <div className="information">
                        <div className="info-childs">
                            <h2>Bienvenido</h2>
                            <p>
                                Registrate y reserva ya tus merecidas vacaciones
                            </p>
                            <input
                            onClick={() => navigate('/signup')}
                            type="button" 
                            value="Registrarse" 
                            />
                        </div>
                    </div>
                    <div className="form-information">
                        <div className="form-information-childs">
                            <span onClick={() => navigate('/')} className="btn-cancelar"><i className="fa-solid fa-xmark"></i></span>
                            <h2>Iniciar Sesión</h2>
                            <div className="icons">
                                <i className="fa-brands fa-google"></i>
                                <i className="fa-brands fa-facebook"></i>
                                <i className="fa-brands fa-linkedin"></i>
                                <i className="fa-brands fa-apple"></i>
                            </div>
                            <p>O Inicia Sesión con una cuenta</p>
                            <form onSubmit={handleSubmit}>
                                <label>
                                    <i className="fa-solid fa-envelope"></i>
                                    <input
                                        onChange={handleChange}
                                        value={formData.email}
                                        type="email"
                                        name="email"
                                        placeholder="Correo Electronico"
                                        required
                                    />
                                </label>
                                <label>
                                    <i className="fa-solid fa-lock"></i>
                                    <input
                                        onChange={handleChange}
                                        value={formData.password}
                                        type="password"
                                        name="password"
                                        placeholder="Contraseña"
                                        required
                                    />
                                </label>
                                <a className="forgot-pass" href="/forgotPass">
                                    Olvidaste tu contraseña?
                                </a>
                                <br />
                                <input
                                    className="btn-register"
                                    type="submit"
                                    value="Login"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
