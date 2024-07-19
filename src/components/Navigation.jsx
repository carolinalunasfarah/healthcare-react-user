import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

// react-bootstrap
import { Container, Nav, Navbar, Offcanvas, Button } from "react-bootstrap";

// context
import { AuthContext } from "../context/AuthContext";

// utils
import { scrollToTop } from "../utils/utils";

// logo
import logo from "/assets/icons/logo.svg";

function Navigation() {
    const { logout, userIsLoggedIn } = useContext(AuthContext);
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const navigate = useNavigate();

    const activeClass = ({ isActive }) => (isActive ? "active" : "inactive");

    const handleLinkClick = () => {
        setShowOffcanvas(false);
        scrollToTop;
    };

    const handleLogout = () => {
        setShowOffcanvas(false);
        logout();
        navigate("/");
    };

    return (
        <Navbar key="md" expand="md" className="sticky-top p-2">
            <Container fluid>
                <Navbar.Brand
                    className="d-flex align-items-center active"
                    href="/"
                    onClick={handleLinkClick}>
                    <img
                        src={logo}
                        alt="Serenamente logo"
                        className="logo me-2"
                    />
                    <span className="ms-3 active logo_name">Serenamente</span>
                </Navbar.Brand>
                <Navbar.Toggle
                    onClick={() => setShowOffcanvas(true)}
                    aria-controls="offcanvasNavbar-expand-md"
                />
                <Navbar.Offcanvas
                    id="offcanvasNavbar-expand-md"
                    aria-labelledby="offcanvasNavbarLabel-expand-md"
                    show={showOffcanvas}
                    placement="end"
                    onHide={() => setShowOffcanvas(false)}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">
                            Menú
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end align-items-center flex-grow-1 gap-3">
                            <NavLink
                                className={activeClass}
                                to="/quienes-somos"
                                onClick={handleLinkClick}>
                                ¿Quiénes somos?
                            </NavLink>
                            {userIsLoggedIn ? (
                                <>
                                    <NavLink
                                        className={activeClass}
                                        to="/diario"
                                        onClick={handleLinkClick}>
                                        Inicio
                                    </NavLink>
                                    <NavLink
                                        className={activeClass}
                                        to="/mindfulness"
                                        onClick={handleLinkClick}>
                                        Mindfulness
                                    </NavLink>
                                    <NavLink
                                        className={activeClass}
                                        to="/ejercicios"
                                        onClick={handleLinkClick}>
                                        Ejercicio físico
                                    </NavLink>
                                    <NavLink
                                        className={activeClass}
                                        to="/seguimiento"
                                        onClick={handleLinkClick}>
                                        Seguimiento
                                    </NavLink>
                                    <Button
                                        variant="secondary"
                                        onClick={handleLogout}
                                        className={activeClass}>
                                        <span className="log_out">
                                            Cerrar sesión
                                        </span>
                                    </Button>
                                </>
                            ) : null}
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default Navigation;
