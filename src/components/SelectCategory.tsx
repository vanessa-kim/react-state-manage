import { categoryState, selectedCategory } from '../atoms'; 
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

const Select = styled.select`
  width: 200px;
  height: 36px;
  border-radius: 5px;
  border: 1px solid #fff;
  padding: 0 10px;
  margin-bottom: 20px;
  margin-top: 10px;
`;

function SelectCategory() {
  const categories = useRecoilValue(categoryState);
  const [category, setCategory] = useRecoilState(selectedCategory);
  const onInput = (event:React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <Select value={category} onInput={onInput}>
      { categories.map(item => (
        <option value={item.category} key={item.category}>
          {item.category}
        </option>
      ))}
    </Select>
);
}

export default SelectCategory;