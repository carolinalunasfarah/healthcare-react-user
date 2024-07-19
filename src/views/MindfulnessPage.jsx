// hooks
import { useContext } from "react";

// component
import ProgressPage from "../components/ProgressPage.jsx";

// context
import { AuthContext } from "../context/AuthContext";

// data
import { MindfulnessVideos } from "../data/MindfulnessVideos.jsx";

const MindfulnessPage = () => {
    const {
        fetchMindfulnessProgress,
        mindfulnessProgress,
        increaseMindfulnessProgress,
        reduceMindfulnessProgress,
    } = useContext(AuthContext);

    return (
        <ProgressPage
            title="Mindfulness"
            videos={MindfulnessVideos}
            fetchProgress={fetchMindfulnessProgress}
            progressData={mindfulnessProgress}
            increaseProgress={increaseMindfulnessProgress}
            reduceProgress={reduceMindfulnessProgress}
        />
    );
};

export default MindfulnessPage;
