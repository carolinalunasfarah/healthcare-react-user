// hooks
import { useContext } from "react";

// component
import VideoDropdown from "../components/VideoDropdown.jsx";

// context
import { AuthContext } from "../context/AuthContext";

// utils
import { useProgress } from "../utils/progressUtils.js";

const ProgressPage = ({ title, videos, fetchProgress, progressData, increaseProgress, reduceProgress }) => {
    const { user } = useContext(AuthContext);

    const {
        open,
        completed,
        handleToggle,
        videoCompleted
    } = useProgress(
        user,
        fetchProgress,
        progressData,
        increaseProgress,
        reduceProgress,
        videos.length
    );

    return (
        <section className="mind-exercise-pages">
            <h2 className="title">{title}</h2>
            <section>
                <VideoDropdown
                    videos={videos}
                    open={open}
                    handleToggle={handleToggle}
                    completed={completed}
                    videoCompleted={videoCompleted}
                />
            </section>
        </section>
    );
};

export default ProgressPage;
