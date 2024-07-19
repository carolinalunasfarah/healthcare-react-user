// hooks
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";

// context
import { AuthContext } from "../context/AuthContext";

// react-bootstrap
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";

// notifications
import Swal from "sweetalert2";

// utils
import { scrollToTop } from "../utils/utils";

const Login = () => {
    const navigate = useNavigate();
    const { login, userIsLoggedIn } = useContext(AuthContext);

    // default user for production
    const [user, setUser] = useState({
        email: "test1@test.com",
        password: "123456789",
    });

    useEffect(() => {
        if (userIsLoggedIn) {
            navigate("/diario");
        }
    }, [userIsLoggedIn, navigate]);

    const handleUser = (event) =>
        setUser({ ...user, [event.target.name]: event.target.value });

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!user.email || !user.password) {
            Swal.fire({
                title: "Ups...",
                text: "Todos los campos son obligatorios!",
                icon: "error",
            });
            return;
        }

        try {
            const success = await login(user);
            if (success) {
                navigate(`/diario`);
            }
        } catch (error) {
            Swal.fire({
                title: "Ups...",
                text: "Todos los campos son obligatorios!",
                icon: "error",
            });
        }
    };

    return (
        <Container fluid>
            <Row className="d-flex justify-content-center mx-1 mx-lg-0 py-4">
                <Col className=" p-4">
                    <h3 className="cursor_default login">Ingresar</h3>
                    <section>
                        <Form onSubmit={handleSubmit}>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="text"
                                    id="loginEmail"
                                    name="email"
                                    value={user.email}
                                    onChange={handleUser}
                                    placeholder="email@mail.com"
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="password"
                                    id="loginPassword"
                                    name="password"
                                    value={user.password}
                                    onChange={handleUser}
                                    placeholder="Contraseña"
                                />
                            </InputGroup>
                            <section className="d-flex">
                                <article className="w-100">
                                    <Button
                                        type="submit"
                                        aria-label="Iniciar sesión"
                                        onClick={scrollToTop}
                                        variant="primary"
                                        className="w-80 text-white">
                                        Iniciar sesión
                                    </Button>
                                </article>
                            </section>
                        </Form>
                    </section>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
