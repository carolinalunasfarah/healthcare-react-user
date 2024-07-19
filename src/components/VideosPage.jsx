// component
import VideoDropdown from "../components/VideoDropdown";

const VideosPage = ({ title, videos }) => {
    return (
        <section className="home d-flex flex-column">
            <h2 className="title">{title}</h2>
            <section>
                <VideoDropdown videos={videos} />
            </section>
        </section>
    );
};

export default VideosPage;
