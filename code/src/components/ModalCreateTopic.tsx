import { useState } from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import {CardTopics} from './CardTypeTopics';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: "10px",
    boxShadow: 18,
    p: 4,
};

interface ModalCreate {
  action: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalCreateTopic({ action, setOpenModal }: ModalCreate) {
    const [valueTopics, setValueTopics] = useState("");
    const [topics, setTopics] = useState<{ id: string; topic: string }[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleAddTopic = () => {
        const trimmed = valueTopics.trim();
        if (trimmed.length <= 0) {
            setError("Type something and make sure it is not repeated");
            return;
        }

        if(trimmed.length > 10) {
            setError("Character size limit of 10");
            return;
        }

        if (topics.length >= 6) {
            setError("The maximum number of topics is 6.");
            return;
        }

        if (topics.find(t => t.id === trimmed)) {
            setError("This topic has already been added.");
            return;
        }

        setTopics(prev => [...prev, { id: trimmed, topic: trimmed }]);
        setValueTopics("");
        setError(null); 
    };

    const handleRemoveTopic = (id: string) => {
        setTopics(prev => prev.filter(topic => topic.id !== id));
    };

    const handleSubmit = (event: React.FormEvent) => {
        if (topics.length <= 0) {
            setError("Need at least 1 topic");
            event.preventDefault();
            return;
        }

        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const formJson = Object.fromEntries((formData as any).entries());
        alert(JSON.stringify(formJson));
    };

    return (
        <div>
            <Modal
                open={action}
                onClose={() => setOpenModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={1}>
                                <h1 style={{ fontSize: "20px", fontFamily: "sans-serif", marginBottom: "10px" }}>
                                    Create your talking 💬!
                                </h1>
                                <label style={{ fontFamily: "sans-serif", fontWeight: "bold" }} htmlFor="title-modal">
                                    Title
                                </label>
                                <Input id="title-modal" placeholder="Typing your title..." required />
                                <label style={{ fontFamily: "sans-serif", fontWeight: "bold" }} htmlFor="topic-modal">
                                    Topics
                                </label>
                                <Input
                                    id="topic-modal"
                                    onChange={(e) => setValueTopics(e.target.value)}
                                    placeholder="Typing topics here..."
                                    endDecorator={
                                        <Button onClick={handleAddTopic}>Add</Button>
                                    }
                                />
                                {error && <p style={{ color: "red", fontSize: "14px", fontFamily: "sans-serif" }}>{error}</p>}

                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        flexWrap: "wrap",
                                        gap: "10px",
                                        marginTop: "20px",
                                        marginBottom: "10px",
                                    }}
                                    className="display-topics"
                                >
                                    {topics.map((x) => (
                                        <CardTopics
                                            key={x.id}
                                            msg={x.topic}
                                            onDelete={() => handleRemoveTopic(x.id)}
                                        />
                                    ))}
                                </div>

                                <Button type="submit">Create</Button>
                            </Stack>
                        </form>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
