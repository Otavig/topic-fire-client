import { useState, useEffect } from "react";
import InputSearch from "../components/InputSearch";
import CardTopics from "../components/CardTopics";
import ModalCreateTopic from "../components/ModalCreateTopic";
// import SelectTopics from "../components/SelectTopics";
import Alert from '@mui/joy/Alert';
import { GoPlus } from "react-icons/go";
import { FiRefreshCw } from "react-icons/fi";
import Button from "@mui/joy/Button";
import LinearProgress from '@mui/joy/LinearProgress';
import '../styles/styles-screens/home.css';

export default function Home() {
    let [searchText, setSearchText] = useState("");
    let [reasonError, setReasonError] = useState("");
    let [openModal, setOpenModal] = useState(false);
    let [refreshList, setRefreshList] = useState(false);

    const topics = [
        { id: 1, msg: "Talking for code", topics: ["code", "talking"] },
        { id: 2, msg: "Talking for gamers", topics: ["games"] },
        { id: 3, msg: "Talking for studying", topics: ["study", "math"] },
    ];

    const filteredTopics = topics.filter((topic) => {
        const lowerSearch = searchText.toLowerCase();
        const matchesMsg = topic.msg.toLowerCase().includes(lowerSearch);
        const matchesTopic = topic.topics.some((t) => t.toLowerCase().includes(lowerSearch));
        return matchesMsg || matchesTopic;
    });

    useEffect(() => {
        if (reasonError) {
        const timer = setTimeout(() => {
            setReasonError("");
        }, 3000);

        return () => clearTimeout(timer);
        }
    }, [reasonError]);

    return (
        <div className="main">
            <div className="head">
                <InputSearch place="Type in here..." msg="Search" action={(text) => {
                    text ? setSearchText(text) : setReasonError("The text field needs to be filled in!");
                }}/>
            </div>

            <div className="content">
                <div className="title-container">
                    <h1 className="title">
                        Conversations for you 😊!
                    </h1>

                    <div className="add-cv" style={{ fontFamily: "sans-serif", display: "flex", alignItems: "center", gap: "5px" }}>
                        <Button style={{ padding: "0px 20px" }} variant="outlined"
                            onClick={() => setOpenModal(true)}>
                            <GoPlus size={16} />
                        </Button>

                        <Button style={{ padding: "0px 20px" }} variant="outlined"
                            onClick={() => {
                                setRefreshList(true);
                                setSearchText("");
                                setTimeout(() => setRefreshList(false), 500);
                            }}>
                            <FiRefreshCw size={16} />
                        </Button>
                    </div>
                </div>

                {refreshList && (
                    <div style={{ width: '40%', margin: "0 auto", marginTop: "100px" }}>
                        <LinearProgress />
                    </div>
                )}

                <div className="list">
                    {!refreshList && filteredTopics.map((topic) => (
                        <CardTopics key={topic.id} msg={topic.msg} topics={topic.topics} />
                    ))}
                </div>

                <ModalCreateTopic action={openModal} setOpenModal={setOpenModal} />
            </div>

            {reasonError && (
                <div className="custom-alert">
                    <Alert variant="solid" color="danger">
                        <p style={{fontWeight: "bold"}}>{reasonError}</p>
                    </Alert>
                </div>
            )}
        </div>
    )
}
