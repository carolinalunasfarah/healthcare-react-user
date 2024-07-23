// hooks
import { useContext, useState, useEffect } from "react";

// context
import { AuthContext } from "../context/AuthContext";

// progress circular bar
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "../progressBarStyles.css";

// react-bootstrap
import { Row } from "react-bootstrap";

// utils
import { fetchProgressData } from "../utils/progressUtils.js";

const FUProgress = () => {
    const {
        mindfulnessProgress,
        exerciseProgress,
        fetchMindfulnessProgress,
        fetchExerciseProgress,
        user,
    } = useContext(AuthContext);
    const [mindfulnessPercentage, setMindfulnessPercentage] = useState(0);
    const [exercisePercentage, setExercisePercentage] = useState(0);

    useEffect(() => {
        fetchProgressData(
            user,
            fetchMindfulnessProgress,
            fetchExerciseProgress,
            mindfulnessProgress,
            exerciseProgress,
            setMindfulnessPercentage,
            setExercisePercentage
        );
    }, [
        mindfulnessProgress,
        exerciseProgress,
        fetchExerciseProgress,
        fetchMindfulnessProgress,
        user,
    ]);

    return (
        <section className="progress-container">
            {/* Mindfulness Progress */}
            <Row className="flex_col">
                <CircularProgressbar
                    className="col-12 col-sm-12 col-md-3 col-lg-3 me-4 progress-bar"
                    value={mindfulnessPercentage}
                    text={`${mindfulnessPercentage.toFixed(0)}%`}
                    styles={buildStyles({
                        textSize: "18px",
                    })}
                />
                <h3 className="mt-4 progress_text">Mindfulness completado</h3>
                <article className="mt-4 fu_form flex_col">
                    <a
                        href="https://google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="form_mind"
                        aria-label="Ir a form de mindfulness de seguimiento">
                        Formulario Seguimiento Mindfulness
                    </a>
                </article>
            </Row>

            {/* Exercise Progress */}
            <Row className="flex_col">
                <CircularProgressbar
                    className="col-12 col-sm-12 col-md-3 col-lg-3 me-4 progress-bar"
                    value={exercisePercentage}
                    text={`${exercisePercentage.toFixed(0)}%`}
                    styles={buildStyles({
                        textSize: "18px",
                    })}
                />
                <h3 className="mt-4 progress_text">Ejercicio completado</h3>
                <article className="mt-4 fu_form flex_col">
                    <a
                        href="https://google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="form_exercise"
                        aria-label="Ir a form de ejercicio de seguimiento">
                        Formulario Seguimiento Mindfulness
                    </a>
                </article>
            </Row>
        </section>
    );
};

export default FUProgress;
