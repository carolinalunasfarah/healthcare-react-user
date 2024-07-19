import { getDayOfYear } from "./utils.js";
import { DailyMessages } from "../data/DailyMessages.jsx";

export const getRandomMessageIndex = () => {
    // get day
    const today = new Date();
    const dayOfYear = getDayOfYear(today);

    // last day the message was shown
    const lastShownDayOfYear = localStorage.getItem("lastShownDayOfYear");

    if (lastShownDayOfYear && parseInt(lastShownDayOfYear, 10) === dayOfYear) {
        return null;
    }

    const newIndex = Math.floor(Math.random() * DailyMessages.length);
    localStorage.setItem("lastShownDayOfYear", dayOfYear);

    return newIndex;
};
