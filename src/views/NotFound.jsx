import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    };

    return (
        <section className="welcome_texts w-100 not_found">
            <section className="flex_col">
                <h2 className="title">¡Ooops!</h2>
                <p className="pb-4 welcome_texts">
                    La página solicitada no existe.
                </p>
                <img
                    className="notFound_img mb-4"
                    src="/assets/icons/notFound.svg"
                    alt="Sad face icon"
                />
                <button
                    onClick={handleClick}
                    className="btn btn-primary cursor-pointer mb-3 w-60"
                    aria-label="Ir a sección">
                    <h4 className="card_header cursor-pointer">Ir al Home</h4>
                </button>
            </section>
        </section>
    );
};

export default NotFound;
