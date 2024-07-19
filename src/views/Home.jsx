// hooks
import { useRef, useState } from "react";

// react-bootstrap
import { Col, Row } from "react-bootstrap";

// components
import Login from "../components/Login";
import Register from "../components/Register";

// utils
import { scrollToElement } from "../utils/utils";

const Home = () => {
    const [showRegister, setShowRegister] = useState(false);
    const registerRef = useRef(null);

    const handleClick = () => {
        setShowRegister(!showRegister);
        setTimeout(() => {
            scrollToElement(registerRef);
        }, 200);
    };
    return (
        <section className="home">
            <article className="flex_col col-sm-12">
                <h2 className="title">
                    ¡Te damos la bienvenida a Serenamente!
                </h2>
                <article className="home_about mt-4">
                    <p className="mt-3 cursor_default">
                        Serenamente es una plataforma de acompañamiento para
                        personas con cáncer mamario, para que puedan crear una
                        cuenta, revisar videos de mindfulness y ejercicio
                        físico, así como también poder ver su seguimiento.
                    </p>
                </article>
            </article>
            <Row className="flex_col">
                <Col className="col-sm-12 col-md-8 col-lg-4">
                    <Login />
                    <article className="row home_register">
                        <p className="col cursor_default">¿No tienes cuenta?</p>
                        <p
                            onClick={handleClick}
                            className="quaternary cursor-pointer col"
                            aria-label="Ver sección Registro">
                            <span className="register_link">Regístrate</span>
                        </p>
                    </article>
                </Col>
                <Col className="col-sm-12 col-md-8 col-lg-4">
                    <article ref={registerRef}>
                        {showRegister && <Register />}
                    </article>
                </Col>
            </Row>
        </section>
    );
};

export default Home;
