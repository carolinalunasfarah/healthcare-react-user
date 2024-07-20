import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// context
import { AuthContext } from "../context/AuthContext";

// react-bootstrap
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";

// database
import { addUser } from "../services/dbService";

// notifications
import Swal from "sweetalert2";

// utils
import { scrollToTop } from "../utils/utils";

// validations
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const nameRegex = /^[A-Za-z\s]+$/i;
const passwordMinLength = 6;

const Register = () => {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleUser = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, name, password } = user;

        if (!email || !name || !password) {
            Swal.fire({
                icon: "error",
                title: "Error de registro",
                text: "Todos los campos son obligatorios.",
            });
            return;
        }

        // name validation
        if (!nameRegex.test(name)) {
            Swal.fire({
                icon: "error",
                title: "Ups...",
                text: "Por favor, introduce un nombre sin caracteres especiales ni números.",
            });
            return;
        }

        // email validation
        if (!emailRegex.test(email)) {
            Swal.fire({
                icon: "error",
                title: "Ups...",
                text: "Por favor, introduce un email válido.",
            });
            return;
        }

        // password validation
        if (password.length < passwordMinLength) {
            Swal.fire({
                icon: "error",
                title: "Ups...",
                text: `La contraseña debe tener al menos ${passwordMinLength} caracteres.`,
            });
            return;
        }

        try {
            const success = await register(user);
            if (success) {
                const { email, name } = user;
                const addUserResult = await addUser(email, name);
                if (addUserResult.success) {
                    navigate(`/diario`);
                } else {
                    console.error(
                        "Error al añadir usuario:",
                        addUserResult.error
                    );
                }
            }
        } catch (error) {
            console.error("Error en el registro:", error);
        }
    };

    return (
        <Container fluid>
            <Row className="d-flex justify-content-center mx-1 mx-lg-0 py-4">
                <Col className="p-4">
                    <h3 className="cursor_default register">
                        Crear Cuenta
                    </h3>
                    <section>
                        <Form onSubmit={handleSubmit}>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={user.name}
                                    onChange={handleUser}
                                    placeholder="Nombre"
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="text"
                                    id="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleUser}
                                    placeholder="email@mail.com"
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="password"
                                    id="password"
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
                                        aria-label="Registrarse"
                                        onClick={scrollToTop}
                                        variant="terciary"
                                        className="w-80 text-white">
                                        Registrarse
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

export default Register;
