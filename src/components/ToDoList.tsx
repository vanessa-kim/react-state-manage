import CreateToDo from './CreateToDo';
import CreateCategory from './CreateCategory';
import SelectCategory from './SelectCategory';
import List from './List';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 50px;
  max-width: 700px;
  margin: 0 auto;
`;
const Title = styled.h1`
  font-size: 40px;
  line-height: 60px;
  text-align: center;
`;
const AddForm = styled.div`
  display: flex;
`;
const Label = styled.strong`
  font-size: 18px;
  min-width: 200px;
  color: white;
  line-height: 50px;
`;
function ToDoList() {
  return (
    <Wrapper>
      <Title>To Dos</Title>
      <hr />
      <AddForm>
        <Label>New category</Label>
        <CreateCategory></CreateCategory>
      </AddForm>
      <hr />
      <SelectCategory />
      <CreateToDo />
      <List />
    </Wrapper>
  )
}

export default ToDoList;