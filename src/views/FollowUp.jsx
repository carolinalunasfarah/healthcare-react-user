// components
import FUMessage from "../components/FUMessage";
import FUProgress from "../components/FUProgress";

// react-bootstrap
import { Col, Row } from "react-bootstrap";

const FollowUp = () => {
    return (
        <Col className="home flex_col">
            <h2 className="title">Tu seguimiento</h2>
            <article className="fu_message">
                <FUMessage />
            </article>
            <Row>
                <h3 className="title">Mis avances</h3>
                <FUProgress/>
            </Row>
        </Col>
    );
};

export default FollowUp;
