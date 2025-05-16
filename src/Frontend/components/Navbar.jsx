import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuthContext";
import { useLanguage } from "../context/LanguageContext";
import LanguageSelector from "./LanguageSelector/LanguageSelector";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.css";

export const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout, setUser } = useAuth();
    const { texts } = useLanguage();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Load user data from localStorage
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        const userData = localStorage.getItem("user");
        if (token && userData) {
            setUser(JSON.parse(userData));
        } else {
            setUser(null);
        }
    }, [setUser]);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const userLs = localStorage.getItem("user");
    const userId = userLs ? JSON.parse(userLs).id : null;

    return (
        <motion.nav
            className={`nav-container navbar navbar-expand-lg ${
                scrolled ? "scrolled" : ""
            }`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container-fluid">
                {/* Logo with hover animation */}
                <motion.div
                    className="logo-container"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}

                >
                    <img
                        src="/Icono-Posible.png"
                        alt="Logo Easy-Flights"
                        className="img-nav navbar-brand"
                        onClick={() => navigate("/")}
                    />
                </motion.div>

                <motion.button
                    className={`navbar-toggler ${
                        mobileMenuOpen ? "active" : ""
                    }`}
                    type="button"
                    onClick={toggleMobileMenu}
                    whileTap={{ scale: 0.9 }}
                    aria-controls="navbarSupportedContent"
                    aria-expanded={mobileMenuOpen}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </motion.button>


                <AnimatePresence>
                    <motion.div
                        className={`collapse navbar-collapse navbar-interno ${
                            mobileMenuOpen ? "show" : ""
                        }`}
                        id="navbarSupportedContent"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                            opacity: mobileMenuOpen
                                ? 1
                                : window.innerWidth > 992
                                ? 1
                                : 0,
                            height: mobileMenuOpen
                                ? "auto"
                                : window.innerWidth > 992
                                ? "auto"
                                : 0,
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <ul className="nav-list navbar-nav me-auto mb-2 mb-lg-0">
                            {/* Navigation links with hover effects */}
                            <motion.li
                                className="item-nav nav-item"
                                whileHover={{ scale: 1.05 }}
                            >
                                <Link
                                    className="link-nav nav-link"
                                    to="destinations"
                                >
                                    <span className="nav-link-text">
                                        {texts.destination}
                                    </span>
                                    <span className="nav-link-underline"></span>
                                </Link>
                            </motion.li>
                            <motion.li
                                className="item-nav nav-item"
                                whileHover={{ scale: 1.05 }}
                            >
                                <Link
                                    className="link-nav nav-link"
                                    to="/travel-tips"
                                >
                                    <span className="nav-link-text">
                                        {texts.travelTips}
                                    </span>
                                    <span className="nav-link-underline"></span>
                                </Link>
                            </motion.li>
                            <motion.li
                                className="item-nav nav-item"
                                whileHover={{ scale: 1.05 }}
                            >
                                <Link className="link-nav nav-link" to="tools">
                                    <span className="nav-link-text">
                                        {texts.travelTools}
                                    </span>
                                    <span className="nav-link-underline"></span>
                                </Link>
                            </motion.li>
                        </ul>

                        {/* Language selector */}
                        <div className="language-selector-container">
                            <LanguageSelector />
                        </div>

                        {/* User profile with animations */}
                        <motion.div
                            className="user-section d-flex align-items-center gap-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            {user ? (
                                <motion.div
                                    className="user-profile-container"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <motion.div
                                        className="user-avatar"
                                        onClick={() =>
                                            navigate("/about-user/" + user.id)
                                        }
                                        title={user.name}
                                        whileHover={{
                                            boxShadow:
                                                "0 0 15px rgba(0, 211, 211, 0.8)",
                                        }}
                                    >
                                        {user.avatar &&
                                        user.avatar.trim() !== "" ? (
                                            <img
                                                src={user.avatar}
                                                alt="User Avatar"
                                                className="user-avatar-img"
                                            />
                                        ) : user.name ? (
                                            user.name.charAt(0).toUpperCase()
                                        ) : (
                                            "U"
                                        )}
                                    </motion.div>
                                    <motion.button
                                        className="btn-logout"
                                        onClick={handleLogout}
                                        whileHover={{
                                            scale: 1.05,
                                            backgroundColor: "#ff2e92",
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {texts.logout}
                                    </motion.button>
                                </motion.div>
                            ) : (
                                <motion.button
                                    id="btn-nav-login"
                                    onClick={() => navigate("/signup")}
                                    whileHover={{
                                        scale: 1.1,
                                        boxShadow:
                                            "0 0 15px rgba(0, 211, 211, 0.8)",
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    className="login-button"
                                >
                                    <img
                                        src="./user-profile.gif"
                                        alt="User profile"
                                        className="img-nav-login"
                                    />

                                    <span className="login-text">
                                        {texts.login || "Login"}
                                    </span>
                                </motion.button>
                            )}
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};
