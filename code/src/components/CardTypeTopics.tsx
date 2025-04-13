import { useState } from "react";

interface CardTypeTopics {
    msg?: string;
    onDelete?: () => void;
}

function CardTopics({ msg, onDelete }: CardTypeTopics) {
    const [hovered, setHovered] = useState(false);

    const styleWrapper = {
        display: 'inline-block',
    };

    const styleDiv = {
        backgroundColor: "#E6E1EF",
        borderRadius: "20px",
        padding: "6px 14px",
        fontSize: "14px",
        fontWeight: 500,
        color: "black",
        cursor: onDelete ? "pointer" : "default",
        border: hovered && onDelete ? "2px solid red" : "2px solid transparent",
        transition: "border 0.2s ease",
    };

    return (
        <div style={styleWrapper}>
            <p
                style={styleDiv}
                onClick={onDelete}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {msg}
            </p>
        </div>
    );
}

function CardTopicShow({ msg }: CardTypeTopics) {
    const styleWrapper = {
        display: 'inline-block',
    };

    const styleDiv = {
        backgroundColor: "#E6E1EF",
        borderRadius: "20px",
        padding: "6px 14px",
        fontSize: "14px",
        fontWeight: 500,
        color: "black",
        transition: "border 0.2s ease",
    };

    return (
        <div style={styleWrapper}>
            <p
                style={styleDiv}
            >
                {msg}
            </p>
        </div>
    );
}

export {CardTopics, CardTopicShow};