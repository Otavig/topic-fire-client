import { useState, useEffect } from "react";
import InputSearch from "../components/InputSearch";
import CardTopics from "../components/CardTopics";
// import SelectTopics from "../components/SelectTopics";
import Alert from '@mui/joy/Alert';
import { GoPlus } from "react-icons/go";
import Button from "@mui/joy/Button";
import '../styles/styles-screens/home.css';

export default function Home() {
    let [searchText, setSearchText] = useState("");
    let [reasonError, setReasonError] = useState("");

    const topics = [
        { id: 1, msg: "Talking for code" },
        { id: 2, msg: "Talking for gamers" },
        { id: 3, msg: "Talking for studying" },
    ];
    
    const filteredTopics = topics.filter(topic =>
        topic.msg.toLowerCase().includes(searchText.toLowerCase())
    );

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
                    console.log(searchText);
                }}/>
            </div>

            <div className="content">
                <div className="title-container">
                    <h1 className="title">
                        Conversations for you 😊!
                    </h1>

                    <div className="add-cv" style={{fontFamily: "sans-serif", display: "flex", alignItems: "center", gap: "5px"}}>
                        <Button style={{padding: "0px 20px"}} variant="outlined">
                            <GoPlus size={16}/>
                        </Button>
                    </div>
                </div>
                <div className="list">
                    {filteredTopics.map((topic) => (
                        <CardTopics key={topic.id} msg={topic.msg} />
                    ))}
                </div>
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