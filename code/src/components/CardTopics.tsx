import { useState } from "react";
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import Button from "@mui/joy/Button";
import ChatBubbleIcon from "@mui/icons-material/ChatBubbleOutline";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

interface CardTopicsProps {
    msg?: string;
    repliesCount?: number;
    participantsCount?: number;
}

export default function CardTopics({ msg, repliesCount = 0, participantsCount = 0 }: CardTopicsProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            style={{
                cursor: "pointer",
                margin: "20px 0px 0px 0px",
                transition: "0.8s",
                transform: isHovered ? "scale(1.01)" : "scale(1)"
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Card size="md" variant="outlined" color="neutral">
                <Typography
                    level="title-md"
                    textColor="inherit"
                    sx={{ textTransform: 'capitalize' }}
                >
                    {msg}
                </Typography>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }}>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "10px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                <ChatBubbleIcon fontSize="small" />
                                <span>{repliesCount}</span>
                            </div>

                            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                <PeopleAltIcon fontSize="small" />
                                <span>{participantsCount}</span>
                            </div>
                        </div>

                        <Button size="sm" variant="soft" color="primary">
                            Join
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
