import { useForm } from "react-hook-form";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { currentCategoryState, toDoState } from "../atoms";
import styled from "styled-components";

const Form = styled.form`
  height: 40px;
`
const Input = styled.input`
  width: 220px;
  height: 40px;
  border: none;
  padding: 0px 10px;
  font-size: 12px;
  font-weight: bold;
`
const Btn = styled.button`
  width: 60px;
  height: 40px;
  margin: 0px;
  padding: 0px;
`

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const currentCategory = useRecoilValue(currentCategoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      ...oldToDos,
      {
        text: toDo, 
        id: Date.now(), 
        category: currentCategory
      } // 새로운 값으로 덮어써짐
    ]);
    setValue("toDo", "");
  };
  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      <Input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="Write a to do"
      />
      <Btn>Add</Btn>
    </Form>
  );
}

export default CreateToDo;