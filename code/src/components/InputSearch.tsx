import {useState} from "react"
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';

interface InputSearchProps {
    msg?: string;
    place?: string;
    action?: (value: string) => void;
}

export default function InputSearch({ msg, place, action }: InputSearchProps) {
    const [value, setValue] = useState("");

    const handleClick = () => {
        if (action) {
          action(value);
        }

        setValue("");
    };

    return (
        <Input 
            placeholder={place}
            value={value}
            endDecorator={<Button
            onClick={handleClick}>{msg}
            </Button>} 
            onChange={(e) => setValue(e.target.value)}
        />
    )
}