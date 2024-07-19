// react-bootstrap
import { Row, Col } from "react-bootstrap";

// resources
import profile_picture from "/assets/icons/profile-picture.svg";
import about01 from "/assets/icons/about01.svg";
import about02 from "/assets/icons/about02.svg";
import about03 from "/assets/icons/about03.svg";
import envelopeHeart from "/assets/icons/envelope-heart.svg";
import instagram from "/assets/icons/instagram.svg";

const About = () => {
    return (
        <section className="flex-col">
            <section className="flex_col">
                <h2 className="title cursor_default">Proyecto: "Título"</h2>
            </section>
            <Row className="justify-content-evenly align-items-center about_page">
                <Col className="col-12 col-sm-12 col-md-2 col-lg-2 flex_col">
                    <img
                        className="about_img"
                        src={profile_picture}
                        alt="Profile picture"
                    />
                </Col>
                <Col className="col-12 col-sm-12 col-md-6 col-lg-6 flex_col">
                    <h4 className="subtitle cursor_default mb-4">
                        Sobre mi / Sobre el proyecto
                    </h4>
                    <article className="about_project">
                        <p className="mt-1 cursor_default">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Sed corporis quod quidem ratione dolores
                            possimus doloremque magni aperiam expedita,
                            molestias earum fugit mollitia, vero alias. Aut
                            tenetur quas doloribus laudantium! Lorem ipsum dolor
                            sit amet consectetur adipisicing elit. Sed corporis
                            quod quidem ratione dolores possimus doloremque
                            magni aperiam expedita, molestias earum fugit
                            mollitia, vero alias. Aut tenetur quas doloribus
                            laudantium!
                        </p>
                    </article>
                    <article className="mt-3 about_icons">
                        <img
                            src={about01}
                            alt="About logo 01, nurse"
                            className="about_icon me-2"
                        />
                        <img
                            src={about02}
                            alt="About logo 02, breast cancer ribbon"
                            className="about_icon me-3"
                        />
                        <img
                            src={about03}
                            alt="About logo 03, health care card"
                            className="about_icon"
                        />
                    </article>
                    <article className="flex_col">
                        <p className="p-2 mt-3 contact">
                            ¿Quieres saber más? Escríbenos o visita nuestras
                            redes sociales
                        </p>
                    </article>
                    <section className="d-flex mb-3">
                        <article className="col-6 col-md-6 col-lg-6 col-sm-6 me-3">
                            <a
                                href="mailto:"
                                aria-label="Enviar correo electrónico">
                                <img
                                    src={envelopeHeart}
                                    alt="Contact logo 01, envelope heart"
                                    className="contact_icon"
                                />
                            </a>
                        </article>
                        <article className="col-6 col-md-6 col-lg-6 col-sm-6 me-4">
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Ir a página de Instagram">
                                <img
                                    src={instagram}
                                    alt="Contact logo 02, instagram logo"
                                    className="contact_icon"
                                />
                            </a>
                        </article>
                    </section>
                </Col>
            </Row>
        </section>
    );
};

export default About;
