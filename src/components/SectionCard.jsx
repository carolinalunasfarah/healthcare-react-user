import { useNavigate } from "react-router-dom";

// data
import { Sections } from "../data/Sections.jsx";

// react-bootstrap
import { Col, Row } from "react-bootstrap";

// utils
import { scrollToTop } from "../utils/utils";

const SectionCard = () => {
    const navigate = useNavigate();

    const handleClick = (path) => {
        navigate(path);
        scrollToTop;
    };

    return (
        <Row className="justify-content-around">
            {Sections.map((data, index) => (
                <Col
                    className="card_article col-12 col-sm-12 col-md-3 col-lg-3 box-shadow"
                    key={index}
                    style={{ backgroundImage: `url(${data.bg_src})` }}
                    onClick={() => handleClick(data.path)}>
                    <button
                        onClick={() => handleClick(data.path)}
                        className="btn btn-terciary cursor-pointer mb-3 w-60"
                        aria-label="Ir a sección">
                        <h4 className="card_header cursor-pointer">
                            {data.name}
                        </h4>
                    </button>
                </Col>
            ))}
        </Row>
    );
};

export default SectionCard;
