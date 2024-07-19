import { Route, Routes } from "react-router-dom";

// sources
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// views
import Home from "./views/Home";
import Diary from "./views/Diary";
import FollowUp from "./views/FollowUp";
import About from "./views/About";
import MindfulnessPage from "./views/MindfulnessPage";
import ExercisesPage from "./views/ExercisesPage";
import NotFound from "./views/NotFound";

// components
import Navigation from "./components/Navigation";
import PrivateRoute from "./components/PrivateRoute";

function App() {
    return (
        <>
            <Navigation />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/diario"
                    element={
                        <PrivateRoute>
                            <Diary />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/mindfulness"
                    element={
                        <PrivateRoute>
                            <MindfulnessPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/ejercicios"
                    element={
                        <PrivateRoute>
                            <ExercisesPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/seguimiento"
                    element={
                        <PrivateRoute>
                            <FollowUp />
                        </PrivateRoute>
                    }
                />
                <Route path="/quienes-somos" element={<About />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
