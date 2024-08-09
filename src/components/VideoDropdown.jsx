// lite-youtube component
import "@justinribeiro/lite-youtube";

// react bootstrap
import { Collapse, Button, Row } from "react-bootstrap";

const VideoDropdown = ({
    videos,
    open,
    completed = [],
    handleToggle,
    videoCompleted,
}) => {
    return (
        <section>
            {videos.map((data, index) => (
                <section key={index} className="video_dropdown">
                    <Row className="d-flex align-items-center justify-content-center">
                        <i
                            onClick={() => handleToggle(index)}
                            aria-controls={`video-collapse-text-${index}`}
                            aria-expanded={open[index]}
                            className={`col-1 bi ${
                                open[index]
                                    ? "bi-arrow-down-right-circle-fill"
                                    : "bi-arrow-right-circle-fill"
                            }`}></i>
                        <h2 className="col-4 d-flex">{data.name}</h2>
                        <Button
                            className="col-2 d-none d-md-block"
                            variant={
                                Array.isArray(completed) &&
                                completed.includes(index)
                                    ? "completed"
                                    : "notCompleted"
                            }
                            onClick={() => videoCompleted(index)}>
                            {Array.isArray(completed) &&
                            completed.includes(index)
                                ? "Completado"
                                : "Marcar completado"}
                        </Button>
                        <i
                            className={`col-2 d-md-none bi ${
                                Array.isArray(completed) &&
                                completed.includes(index)
                                    ? "bi-check-circle-fill"
                                    : "bi-circle"
                            }`}
                            onClick={() => videoCompleted(index)}
                            style={{ cursor: "pointer" }}></i>
                    </Row>
                    <Row className="d-flex align-items-center justify-content-center">
                        <Collapse in={open[index]}>
                            <section
                                id={`video-collapse-text-${index}`}
                                className="mt-4 flex_col">
                                <article className="video-drop">
                                    <lite-youtube
                                        videoid={data.video_id}></lite-youtube>
                                </article>
                            </section>
                        </Collapse>
                    </Row>
                </section>
            ))}
        </section>
    );
};

export default VideoDropdown;
