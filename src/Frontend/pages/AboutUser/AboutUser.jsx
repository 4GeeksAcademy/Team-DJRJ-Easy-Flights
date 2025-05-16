// ...existing imports...
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./AboutUser.css";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuthContext";

const URL = import.meta.env.VITE_BACKEND_URL;

const AboutUser = () => {
    const { user, setUser } = useAuth();
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        subscription: "",
        avatar: null,
    });
    // const [history, setHistory] = useState([]);
    // const [purchases, setPurchases] = useState([]);
    const [activeTab, setActiveTab] = useState("subscription");
    const [isLoading, setIsLoading] = useState(true);
    const [notification, setNotification] = useState({
        show: false,
        message: "",
        type: "",
    });

    const { userId } = useParams();
    const access_token = localStorage.getItem("access_token");

    useEffect(() => {
        const userLS = localStorage.getItem("user");
        if (userLS) {
            const userObj = JSON.parse(userLS);
            setUserData((prev) => ({
                ...prev,
                name: userObj.name || "",
                email: userObj.email || "",
                subscription: userObj.subscription || "",
                avatar: userObj.avatar || null,
            }));
            
            // // Fetch user flight history and purchases once user data is loaded
            // fetchUserFlights(userObj.id);
            // fetchUserPurchases(userObj.id);
            
            setIsLoading(false);
        }
    }, []);

    // // Función para obtener el historial de vuelos
    // const fetchUserFlights = async (id) => {
    //     try {
    //         // Verificar que tenemos un ID de usuario
    //         const userId = id || user?.id;
    //         if (!userId) return;

    //         const response = await fetch(`${URL}/api/user/${userId}/flights`, {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `Bearer ${access_token}`,
    //             },
    //         });

    //         if (!response.ok) {
    //             throw new Error(`Error ${response.status}: ${response.statusText}`);
    //         }

    //         const data = await response.json();
    //         setHistory(data.flights || []);
    //     } catch (error) {
    //         console.error("Error fetching flight history:", error);
    //         showNotification("Error al cargar historial de vuelos", "error");
    //     }
    // };

    // // Función para obtener las compras del usuario
    // const fetchUserPurchases = async (id) => {
    //     try {
    //         // Verificar que tenemos un ID de usuario
    //         const userId = id || user?.id;
    //         if (!userId) return;

    //         const response = await fetch(`${URL}/api/user/${userId}/purchases`, {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `Bearer ${access_token}`,
    //             },
    //         });

    //         if (!response.ok) {
    //             throw new Error(`Error ${response.status}: ${response.statusText}`);
    //         }

    //         const data = await response.json();
    //         setPurchases(data.purchases || []);
    //     } catch (error) {
    //         console.error("Error fetching purchases:", error);
    //         showNotification("Error al cargar historial de compras", "error");
    //     }
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAvatar = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("avatar", file);

        const userInfo = JSON.parse(localStorage.getItem("user") || "{}");
        const id = userId || userInfo.id;

        if (!id) {
            showNotification("User ID not found", "error");
            return;
        }

        fetch(`${URL}/api/user/${id}/avatar/upload`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            body: formData,
        })
            .then(async (res) => {
                if (!res.ok) {
                    let errorMessage = `Error ${res.status}: ${res.statusText}`;
                    try {
                        const errorData = await res.json();
                        errorMessage = errorData.msg || errorMessage;
                    } catch (e) {}
                    throw new Error(errorMessage);
                }
                return res.json();
            })
            .then((data) => {
                const userInfo = JSON.parse(localStorage.getItem("user") || "{}");
                userInfo.avatar = data.user.avatar;
                localStorage.setItem("user", JSON.stringify(userInfo));

                // Actualizar el usuario global del contexto
                setUser((prev) => ({
                    ...prev,
                    avatar: data.user.avatar
                }));

                // Actualizar el estado local
                setUserData(prev => ({
                    ...prev,
                    avatar: data.user.avatar
                }));

                showNotification("Avatar actualizado correctamente", "success");
            })
            .catch((err) => {
                showNotification(`Error al subir avatar: ${err.message}`, "error");
            });
    };

    const showNotification = (message, type) => {
        setNotification({ show: true, message, type });
        setTimeout(() => {
            setNotification({ show: false, message: "", type: "" });
        }, 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userInfo1 = JSON.parse(localStorage.getItem("user") || "{}");
            const id = userId || userInfo1.id;

            if (!id) {
                showNotification("User ID not found", "error");
                return;
            }

            const response = await fetch(
                `${URL}/api/user/${id}/profile/update`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${access_token}`,
                    },
                    body: JSON.stringify(userData),
                }
            );

            if (!response.ok) {
                let errorMessage = `Error ${response.status}: ${response.statusText}`;
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.msg || errorMessage;
                } catch (e) {}
                throw new Error(errorMessage);
            }

            const data = await response.json();

            // Actualizar información en localStorage y contexto global
            let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
            userInfo.name = userData.name;
            userInfo.subscription = userData.subscription;
            localStorage.setItem("user", JSON.stringify(userInfo));
            setUser((prev) => ({
                ...prev,
                name: userData.name,
                subscription: userData.subscription
            }));

            showNotification("Perfil actualizado correctamente", "success");
        } catch (error) {
            showNotification(`Error al actualizar perfil: ${error.message}`, "error");
        }
    };

    // Function to format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    // Animation variants for framer-motion
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.4 },
        },
    };

    if (isLoading) {
        return (
            <div className="ausr-loading">
                <div className="ausr-loading-spinner"></div>
                <p>Cargando perfil...</p>
            </div>
        );
    }

    return (
        <motion.div
            className="ausr-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            {notification.show && (
                <div
                    className={`ausr-notification ausr-notification-${notification.type}`}
                >
                    {notification.message}
                </div>
            )}

            <div className="ausr-header">
                <h1>Perfil de Usuario</h1>
                <p className="ausr-subtitle">
                    Gestiona tu información y preferencias
                </p>
            </div>

            <div className="ausr-content">
                <aside className="ausr-sidebar">
                    <div className="ausr-avatar-section">
                        <div className="ausr-avatar-wrapper">
                            {userData.avatarPreview || userData.avatar ? (
                                <img
                                    src={
                                        userData.avatarPreview ||
                                        userData.avatar
                                    }
                                    alt="Avatar"
                                    className="ausr-avatar"
                                />
                            ) : (
                                <div className="ausr-avatar ausr-avatar-default">
                                    {userData.name
                                        ? userData.name.charAt(0).toUpperCase()
                                        : "U"}
                                </div>
                            )}
                            <div className="ausr-avatar-overlay">
                                <label
                                    htmlFor="avatar-upload"
                                    className="ausr-avatar-upload-btn"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                        <polyline points="17 8 12 3 7 8"></polyline>
                                        <line
                                            x1="12"
                                            y1="3"
                                            x2="12"
                                            y2="15"
                                        ></line>
                                    </svg>
                                </label>
                                <input
                                    id="avatar-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatar}
                                    className="ausr-avatar-input"
                                />
                            </div>
                        </div>
                        <h3 className="ausr-username">{userData.name}</h3>
                        <p className="ausr-user-email">{userData.email}</p>
                    </div>

                    <nav className="ausr-nav">
                        {/* <button
                            onClick={() => setActiveTab("history")}
                            className={`ausr-nav-btn ${
                                activeTab === "history" ? "active" : ""
                            }`}
                        >
                            <svg
                                className="ausr-icon"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            Historial de Viajes
                        </button> */}
                        {/* <button
                            onClick={() => setActiveTab("purchases")}
                            className={`ausr-nav-btn ${
                                activeTab === "purchases" ? "active" : ""
                            }`}
                        >
                            <svg
                                className="ausr-icon"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <path d="M16 10a4 4 0 0 1-8 0"></path>
                            </svg>
                            Compras
                        </button> */}
                        {/* <button
                            onClick={() => setActiveTab("subscription")}
                            className={`ausr-nav-btn ${
                                activeTab === "subscription" ? "active" : ""
                            }`}
                        >
                            <svg
                                className="ausr-icon"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 1v22"></path>
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                            </svg>
                            Subscripción
                        </button> */}
                    </nav>
                </aside>

                <section className="ausr-main">
                    {/* {activeTab === "history" && (
                        <motion.div
                            className="ausr-tab-content"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <h2 className="ausr-section-title">Historial de Viajes</h2>
                            
                            {history.length > 0 ? (
                                <div className="ausr-cards-grid">
                                    {history.map((flight, index) => (
                                        <motion.div
                                            key={index}
                                            className="ausr-card"
                                            variants={itemVariants}
                                        >
                                            <div className="ausr-card-header">
                                                <h3>{flight.destination}</h3>
                                                <span className="ausr-card-date">
                                                    {formatDate(flight.date)}
                                                </span>
                                            </div>
                                            <div className="ausr-card-body">
                                                <p>Origen: {flight.origin}</p>
                                                <p>Destino: {flight.destination}</p>
                                                <p>Pasajeros: {flight.passengers}</p>
                                                <p className="ausr-card-price">
                                                    Precio: ${flight.price}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="ausr-empty-state">
                                    <svg
                                        className="ausr-empty-icon"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                    </svg>
                                    <h3>No tienes historial de viajes</h3>
                                    <p>
                                        Tu historial de viajes aparecerá aquí una vez que
                                        hayas realizado algún viaje.
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    )} */}

                    {/* {activeTab === "purchases" && (
                        <motion.div
                            className="ausr-tab-content"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <h2 className="ausr-section-title">Historial de Compras</h2>
                            
                            {purchases.length > 0 ? (
                                <div className="ausr-cards-grid">
                                    {purchases.map((purchase, index) => (
                                        <motion.div
                                            key={index}
                                            className="ausr-card"
                                            variants={itemVariants}
                                        >
                                            <div className="ausr-card-header">
                                                <h3>Compra #{purchase.id}</h3>
                                                <span className="ausr-card-date">
                                                    {formatDate(purchase.date)}
                                                </span>
                                            </div>
                                            <div className="ausr-card-body">
                                                <p>Producto: {purchase.item}</p>
                                                <p>Cantidad: {purchase.quantity}</p>
                                                <p className="ausr-card-price">
                                                    Total: ${purchase.total}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="ausr-empty-state">
                                    <svg
                                        className="ausr-empty-icon"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                        <line x1="3" y1="6" x2="21" y2="6"></line>
                                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                                    </svg>
                                    <h3>No tienes compras recientes</h3>
                                    <p>
                                        Tu historial de compras aparecerá aquí una vez que
                                        hayas realizado alguna compra.
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    )} */}

                    {activeTab === "subscription" && (
                        <motion.div
                            className="ausr-tab-content"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <h2 className="ausr-section-title">Gestionar Suscripción</h2>
                            
                            <form onSubmit={handleSubmit} className="ausr-form">
                                <div className="ausr-form-group">
                                    <label htmlFor="name">Nombre completo</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={userData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                
                                <div className="ausr-form-group">
                                    <label htmlFor="email">Correo electrónico</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={userData.email}
                                        disabled
                                        className="ausr-input-disabled"
                                    />
                                    <small>(El correo electrónico no se puede modificar)</small>
                                </div>
                                
                                <div className="ausr-form-group">
                                    <label htmlFor="subscription">Plan de suscripción</label>
                                    <select
                                        id="subscription"
                                        name="subscription"
                                        value={userData.subscription}
                                        onChange={handleChange}
                                    >
                                        <option value="free">Plan Básico (Gratuito)</option>
                                        <option value="premium">Plan Premium ($9.99/mes)</option>
                                        <option value="business">Plan Business ($19.99/mes)</option>
                                    </select>
                                </div>
                                
                                <button type="submit" className="ausr-btn ausr-btn-primary">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                                        <polyline points="17 21 17 13 7 13 7 21"></polyline>
                                        <polyline points="7 3 7 8 15 8"></polyline>
                                    </svg>
                                    Guardar Cambios
                                </button>
                            </form>
                        </motion.div>
                    )}
                </section>
            </div>
        </motion.div>
    );
};

export default AboutUser;