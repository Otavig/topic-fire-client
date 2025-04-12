import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

interface Opcao {
  id: number;
  name: string;
}

interface InputSearchProps {
  place?: string;
  options: Opcao[];
}

export default function InputSearch({ place, options }: InputSearchProps) {
  return (
    <Select placeholder={place || "Choosen one..."}>
      {options.map((option) => (
        <Option key={option.id} value={option.name}>
          {option.name}
        </Option>
      ))}
    </Select>
  );
}
