// hooks
import { useContext } from "react";

// component
import ProgressPage from "../components/ProgressPage.jsx";

// context
import { AuthContext } from "../context/AuthContext";

// data
import { ExercisesVideos } from "../data/ExercisesVideos.jsx";

const ExercisesPage = () => {
    const {
        fetchExerciseProgress,
        exerciseProgress,
        increaseExerciseProgress,
        reduceExerciseProgress,
    } = useContext(AuthContext);

    return (
        <ProgressPage
            title="Ejercicio Físico"
            videos={ExercisesVideos}
            fetchProgress={fetchExerciseProgress}
            progressData={exerciseProgress}
            increaseProgress={increaseExerciseProgress}
            reduceProgress={reduceExerciseProgress}
        />
    );
};

export default ExercisesPage;
