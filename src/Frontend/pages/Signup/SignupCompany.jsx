import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signupCompany } from "../../services/signup";
import NotificationModal from "../../components/NotificationModal/NotificationModal";
import "./SignupCompany.css";

function SignupCompany() {
    const [notification, setNotification] = useState({
        show: false,
        text: "",
        type: "error",
        duration: 5000
    });
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showSocialAuth, setShowSocialAuth] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        data.role = "COMPANY";
        const result = await signupCompany(data);
        if (result.status === 'OK') {
            setNotification({
                show: true,
                text: result.message,
                type: "success",
                duration: 3000
            });
            setTimeout(() => navigate('/login'), 1500);
        } else  {
            setNotification({
                show: true,
                text: result.message,
                type: "error",
                duration: 5000
            })
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <>
            <NotificationModal
                text={notification.text}
                show={notification.show}
                onClose={() => setNotification({...notification, show: false})}
                type={notification.type}
                duration={notification.duration}
                position="top-center"
                />
            <div className="form-body">
                <div className="container-form-Sc">
                    <div className="information">
                        <div className="info-childs">
                            <h2>Bienvenido</h2>
                            <p>
                                Registrate y reserva ya tus merecidas vacaciones
                            </p>
                            <input
                            onClick={() => navigate('/login')}
                            type="button" 
                            value="Iniciar Sesión" 
                            />
                        </div>
                    </div>
                    <div className="form-information">
                        <div className="form-information-childs">
                            <span onClick={() => navigate('/')} className="btn-cancelar"><i className="fa-solid fa-xmark"></i></span>
                            <h2>Registrarse</h2>
                            <div className="icons">
                                <i className="fa-brands fa-google"></i>
                                <i className="fa-brands fa-facebook"></i>
                                <i className="fa-brands fa-linkedin"></i>
                                <i className="fa-brands fa-apple"></i>
                            </div>
                            <a href="/signup" className="forgot-pass">O registrate como usuario</a>
                            <form onSubmit={handleSubmit}>
                                <fieldset className="d-flex gap-2">
                                    <label>
                                        <i className="fa-solid fa-user"></i>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Nombres Completo"
                                            required
                                        />
                                    </label>
                                    <label>
                                        <i className="fa-solid fa-lock"></i>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="Contraseña"
                                            required
                                        />
                                        <i 
                                        className={`password-toggle fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`} 
                                        onClick={togglePasswordVisibility}
                                        title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                        ></i>
                                    </label>
                                    <label>
                                        <i className="fa-solid fa-envelope"></i>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Correo Electronico"
                                            required
                                        />
                                    </label>
                                </fieldset>
                                <fieldset className="d-flex gap-2">
                                    <label>
                                        <i className="fa-solid fa-phone"></i>
                                        <input
                                            type="phone"
                                            name="phone"
                                            placeholder="Phone"
                                            required
                                        />
                                    </label>
                                    <label>
                                        <i className="fa-solid fa-flag"></i>
                                        <input
                                            type="slug"
                                            name="slug"
                                            placeholder="Slug"
                                            required
                                        />
                                    </label>
                                    <label>
                                        <i className="fa-solid fa-earth"></i>
                                        <input
                                            type="country"
                                            name="country"
                                            placeholder="Country"
                                            required
                                        />
                                    </label>
                                </fieldset>
                                <fieldset className="d-flex gap-2">
                                    <label>
                                        <i className="fa-solid fa-globe"></i>
                                        <input
                                            type="website"
                                            name="website"
                                            placeholder="Website"
                                            required
                                        />
                                    </label>
                                    <label>
                                        <i className="fa-solid fa-star"></i>
                                        <input
                                            type="status"
                                            name="status"
                                            placeholder="Status"
                                            required
                                        />
                                    </label>
                                    <label>
                                        <i className="fa-solid fa-flag"></i>
                                        <input
                                            type="logo_url"
                                            name="logo_url"
                                            placeholder="Logo URL"
                                            required
                                        />
                                    </label>
                                </fieldset>
                                <label>
                                    <i className="fa-solid fa-book"></i>
                                    <input
                                        type="description"
                                        name="description"
                                        placeholder="Description"
                                        required
                                    />
                                </label>
                                <br />
                                <input
                                    className="btn-register"
                                    type="submit"
                                    value="Registrarse"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
        //         <button type="submit">Signup Company</button>
        //         <button onClick={() => navigate("/")} type="button">
        //             Ir a Login
        //         </button>
        //     </form>
        // </>
        // );
}

export default SignupCompany;
