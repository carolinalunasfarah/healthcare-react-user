// hooks
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// context
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
    const { userIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userIsLoggedIn) {
            navigate("/", { replace: true });
        }
    }, [userIsLoggedIn, navigate]);

    if (!userIsLoggedIn) {
        return null;
    }

    return children;
};

export default PrivateRoute;
