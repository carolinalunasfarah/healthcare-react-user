import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

// user: add
export const addUser = async (email, name) => {
    if (!email || typeof email !== "string") {
        console.error("Email inválido:", email);
        return { success: false, error: "Email inválido" };
    }

    try {
        const userDocRef = doc(db, "users", email);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            console.error("El email ya está registrado:", email);
            return { success: false, error: "El email ya está registrado" };
        }

        await setDoc(userDocRef, {
            name: name,
            email: email,
            completedMindfulnessVideos: [],
            completedExerciseVideos: [],
        });
        return { success: true };
    } catch (error) {
        console.error("Error al añadir usuario:", error);
        return { success: false, error: error.message };
    }
};

// user: get
export const getUser = async (email) => {
    if (!email || typeof email !== "string") {
        console.error("Email inválido:", email);
        return { success: false, error: "Email inválido" };
    }
    try {
        const docRef = doc(db, "users", email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { ...docSnap.data(), id: docSnap.id };
        } else {
            console.error("No existe el usuario con email:", email);
            return { success: false, error: "No existe el usuario" };
        }
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        return { success: false, error: error.message };
    }
};

// user progress: add mindfulness video completion
export const addMindfulnessVideoCompletion = async (email, videoIndex) => {
    if (!email || typeof email !== "string") {
        console.error("Email inválido:", email);
        return { success: false, error: "Email inválido" };
    }
    try {
        const userRef = doc(db, "users", email);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            console.error(`Usuario con email ${email} no encontrado`);
            return { success: false, error: `Usuario no encontrado` };
        }

        const currentCompletedVideos =
            userDoc.data().completedMindfulnessVideos || [];
        if (!currentCompletedVideos.includes(videoIndex)) {
            currentCompletedVideos.push(videoIndex);
            await updateDoc(userRef, {
                completedMindfulnessVideos: currentCompletedVideos,
            });
        }

        return { success: true, progress: currentCompletedVideos };
    } catch (error) {
        console.error("Error al guardar progreso de mindfulness:", error);
        return { success: false, error: error.message };
    }
};

// user progress: add exercise video completion
export const addExerciseVideoCompletion = async (email, videoIndex) => {
    if (!email || typeof email !== "string") {
        console.error("Email inválido:", email);
        return { success: false, error: "Email inválido" };
    }
    try {
        const userRef = doc(db, "users", email);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            console.error(`Usuario con email ${email} no encontrado`);
            return { success: false, error: `Usuario no encontrado` };
        }

        const currentCompletedVideos =
            userDoc.data().completedExerciseVideos || [];
        if (!currentCompletedVideos.includes(videoIndex)) {
            currentCompletedVideos.push(videoIndex);
            await updateDoc(userRef, {
                completedExerciseVideos: currentCompletedVideos,
            });
        }

        return { success: true, progress: currentCompletedVideos };
    } catch (error) {
        console.error("Error al guardar progreso de mindfulness:", error);
        return { success: false, error: error.message };
    }
};

// user progress: remove mindfulness video completion
export const removeMindfulnessVideoCompletion = async (email, videoIndex) => {
    if (!email || typeof email !== "string") {
        console.error("Email inválido:", email);
        return { success: false, error: "Email inválido" };
    }
    try {
        const userRef = doc(db, "users", email);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            console.error(`Usuario con email ${email} no encontrado`);
            return { success: false, error: `Usuario no encontrado` };
        }

        const currentCompletedVideos =
            userDoc.data().completedMindfulnessVideos || [];
        const updatedCompletedVideos = currentCompletedVideos.filter(
            (index) => index !== videoIndex
        );

        await updateDoc(userRef, {
            completedMindfulnessVideos: updatedCompletedVideos,
        });

        return { success: true, progress: updatedCompletedVideos };
    } catch (error) {
        console.error("Error al eliminar progreso de mindfulness:", error);
        return { success: false, error: error.message };
    }
};

// user progress: remove exercise video completion
export const removeExerciseVideoCompletion = async (email, videoIndex) => {
    if (!email || typeof email !== "string") {
        console.error("Email inválido:", email);
        return { success: false, error: "Email inválido" };
    }
    try {
        const userRef = doc(db, "users", email);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            console.error(`Usuario con email ${email} no encontrado`);
            return { success: false, error: `Usuario no encontrado` };
        }

        const currentCompletedVideos =
            userDoc.data().completedExerciseVideos || [];
        const updatedCompletedVideos = currentCompletedVideos.filter(
            (index) => index !== videoIndex
        );

        await updateDoc(userRef, {
            completedExerciseVideos: updatedCompletedVideos,
        });

        return { success: true, progress: updatedCompletedVideos };
    } catch (error) {
        console.error("Error al eliminar progreso de mindfulness:", error);
        return { success: false, error: error.message };
    }
};

// user progress: get mindfulness progress
export const getMindfulnessProgress = async (email) => {
    if (!email || typeof email !== "string") {
        console.error("Email inválido:", email);
        return { success: false, error: "Email inválido" };
    }
    try {
        const docRef = doc(db, "users", email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                success: true,
                completedVideos: data.completedMindfulnessVideos || [],
            };
        } else {
            console.error("No existe el usuario con email:", email);
            return { success: false, error: "No existe el usuario" };
        }
    } catch (error) {
        console.error("Error al obtener progreso de mindfulness:", error);
        return { success: false, error: error.message };
    }
};

// user progress: get exercise progress
export const getExerciseProgress = async (email) => {
    if (!email || typeof email !== "string") {
        console.error("Email inválido:", email);
        return { success: false, error: "Email inválido" };
    }
    try {
        const docRef = doc(db, "users", email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                success: true,
                completedVideos: data.completedExerciseVideos || [],
            };
        } else {
            console.error("No existe el usuario con email:", email);
            return { success: false, error: "No existe el usuario" };
        }
    } catch (error) {
        console.error("Error al obtener progreso de ejercicio:", error);
        return { success: false, error: error.message };
    }
};
