// hooks
import { useEffect, useState } from "react";

// data
import { DailyMessages } from "../data/DailyMessages.jsx";

// react-bootstrap
import { Col } from "react-bootstrap";

// utils
import { getRandomMessageIndex } from "../utils/messageUtils.js";

const FUMessage = () => {
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

    useEffect(() => {
        const newIndex = getRandomMessageIndex();
        if (newIndex !== null) {
            setCurrentMessageIndex(newIndex);
        }
    }, []);

    return (
        <Col className="p-2 fu_dailyMessage">
            <h3 className="mt-3 mb-4">Mensaje diario</h3>
            <p>
                {'"'}
                {DailyMessages[currentMessageIndex].message}
                {'"'}
            </p>
            <p className="fu_author">{DailyMessages[currentMessageIndex].author}</p>
        </Col>
    );
};

export default FUMessage;
