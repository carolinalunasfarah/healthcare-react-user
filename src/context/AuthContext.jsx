import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// firebase auth
import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
} from "firebase/auth";

// firebase app configuration
import { app } from "../firebaseConfig";

// database functions
import {
    addUser,
    addMindfulnessVideoCompletion,
    removeMindfulnessVideoCompletion,
    addExerciseVideoCompletion,
    removeExerciseVideoCompletion,
    getMindfulnessProgress,
    getExerciseProgress,
} from "../services/dbService";

// notifications
import Swal from "sweetalert2";

// initialize firebase authentication instance
const auth = getAuth(app);

// create authentication context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
    const [mindfulnessProgress, setMindfulnessProgress] = useState([]);
    const [exerciseProgress, setExerciseProgress] = useState([]);

    // login
    const login = async ({ email, password }) => {
        if (!email || !password) {
            Swal.fire({
                title: "Error de inicio de sesión",
                text: "Todos los campos son obligatorios.",
                icon: "error",
            });
            return false;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const loggedInUser = userCredential.user;
            setUser(loggedInUser);
            setUserIsLoggedIn(true);
            sessionStorage.setItem("user", JSON.stringify(loggedInUser));
            if (loggedInUser?.email) {
                await fetchMindfulnessProgress(userCredential.email);
                await fetchExerciseProgress(userCredential.email);
            }
            navigate(`/diario`);
            return true;
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            Swal.fire({
                title: "Error de inicio de sesión",
                text: "Email y/o contraseña incorrecta.",
                icon: "error",
            });
            return false;
        }
    };

    // registration
    // registration
    const register = async ({ email, password, name }) => {
        if (!email || !password || !name) {
            Swal.fire({
                title: "Error de registro",
                text: "Todos los campos son obligatorios.",
                icon: "error",
            });
            return false;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const registeredUser = userCredential.user;

            const addUserResult = await addUser(email, name);
            if (!addUserResult.success) {
                Swal.fire({
                    title: "Error de registro",
                    text: addUserResult.error,
                    icon: "error",
                });
                return false;
            }
            setUser(registeredUser);
            setUserIsLoggedIn(true);
            navigate(`/diario`);
            return true;
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                Swal.fire({
                    title: "Error de registro",
                    text: "El email ya está registrado, inicia sesión.",
                    icon: "error",
                });
            } else {
                Swal.fire({
                    title: "Error de registro",
                    text: "No se puede registrar.",
                    icon: "error",
                });
            }
            return false;
        }
    };

    // logout
    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            setUserIsLoggedIn(false);
            navigate(`/`);
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    // increase mindfulness session progress
    const increaseMindfulnessProgress = async (email, videoIndex) => {
        const result = await addMindfulnessVideoCompletion(email, videoIndex);
        if (result.success) {
            setMindfulnessProgress(result.progress);
        }
    };

    // reduce mindfulness session progress
    const reduceMindfulnessProgress = async (email, videoIndex) => {
        const result = await removeMindfulnessVideoCompletion(
            email,
            videoIndex
        );
        if (result.success) {
            setMindfulnessProgress(result.progress);
        }
    };

    // increase exercise session progress
    const increaseExerciseProgress = async (email, videoIndex) => {
        const result = await addExerciseVideoCompletion(email, videoIndex);
        if (result.success) {
            setExerciseProgress(result.progress);
        }
    };

    // reduce exercise session progress
    const reduceExerciseProgress = async (email, videoIndex) => {
        const result = await removeExerciseVideoCompletion(email, videoIndex);
        if (result.success) {
            setExerciseProgress(result.progress);
        }
    };

    // fetch mindfulness progress
    const fetchMindfulnessProgress = async (email) => {
        try {
            const result = await getMindfulnessProgress(email);
            if (result.success) {
                setMindfulnessProgress(result.completedVideos);
                return result;
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            console.error("Error fetching mindfulness progress:", error);
            return { success: false, error: error.message };
        }
    };

    // fetch exercise progress
    const fetchExerciseProgress = async (email) => {
        try {
            const result = await getExerciseProgress(email);
            if (result.success) {
                setExerciseProgress(result.completedVideos);
                return result;
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            console.error("Error fetching exercise progress:", error);
            return { success: false, error: error.message };
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setUserIsLoggedIn(true);
                fetchMindfulnessProgress(currentUser.email);
                fetchExerciseProgress(currentUser.email);
            } else {
                setUser(null);
                setUserIsLoggedIn(false);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                userIsLoggedIn,
                login,
                register,
                logout,
                mindfulnessProgress,
                exerciseProgress,
                increaseMindfulnessProgress,
                reduceMindfulnessProgress,
                increaseExerciseProgress,
                reduceExerciseProgress,
                fetchMindfulnessProgress,
                fetchExerciseProgress,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
