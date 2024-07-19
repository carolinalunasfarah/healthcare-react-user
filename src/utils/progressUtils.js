import { useState, useEffect } from "react";

export const calculatePercentages = (
  mindfulnessProgress,
  exerciseProgress,
  setMindfulnessPercentage,
  setExercisePercentage
) => {
  const mindfulnessGoal = 3;
  const exerciseGoal = 3;

  const completedMindfulness = mindfulnessProgress.length;
  const completedExercise = exerciseProgress.length;

  setMindfulnessPercentage((completedMindfulness / mindfulnessGoal) * 100);
  setExercisePercentage((completedExercise / exerciseGoal) * 100);
};

export const fetchProgressData = async (
  user,
  fetchMindfulnessProgress,
  fetchExerciseProgress,
  mindfulnessProgress,
  exerciseProgress,
  setMindfulnessPercentage,
  setExercisePercentage
) => {
  if (user?.email) {
      const mindfulnessResult = await fetchMindfulnessProgress(user.email);
      if (mindfulnessResult.success) {
          calculatePercentages(
              mindfulnessProgress,
              exerciseProgress,
              setMindfulnessPercentage,
              setExercisePercentage
          );
      } else {
          console.error(mindfulnessResult.error);
      }

      const exerciseResult = await fetchExerciseProgress(user.email);
      if (exerciseResult.success) {
          calculatePercentages(
              mindfulnessProgress,
              exerciseProgress,
              setMindfulnessPercentage,
              setExercisePercentage
          );
      } else {
          console.error(exerciseResult.error);
      }
  }
};

// for mindfulness and exercises pages
export const useProgress = (user, fetchProgress, progressData, increaseProgress, reduceProgress, videosLength) => {
    const [open, setOpen] = useState(Array(videosLength).fill(false));
    const [completed, setCompleted] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (user && !dataLoaded) {
                await fetchProgress(user.email);
                setDataLoaded(true);
            }
        };

        fetchData();
    }, [user, fetchProgress, dataLoaded]);

    useEffect(() => {
        setCompleted(progressData);
    }, [progressData]);

    const handleToggle = (index) => {
        const newOpen = [...open];
        newOpen[index] = !newOpen[index];
        setOpen(newOpen);
    };

    const videoCompleted = async (index) => {
        const isCompleted = completed.includes(index);

        if (isCompleted) {
            await reduceProgress(user.email, index);
        } else {
            await increaseProgress(user.email, index);
        }

        await fetchProgress(user.email);
    };

    return {
        open,
        completed,
        handleToggle,
        videoCompleted
    };
};
