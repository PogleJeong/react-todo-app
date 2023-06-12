import { useForm } from 'react-hook-form';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { categoryState } from '../atoms';
import styled from 'styled-components';


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
    addCategory: string;
}

function CreateCategory() {
    const { register, handleSubmit, setValue } = useForm<IForm>();
    const [categories, setCategories] = useRecoilState(categoryState);
    const onValid = ({addCategory}:IForm) => {
        if (categories.includes(addCategory)) {
            alert("이미 존재하는 카테고리입니다.");
            return;
        }
        setCategories((prev)=>{
            return [
                ...prev,
                addCategory
            ]
        })
        setValue("addCategory","");
    }
    return(
        <form onSubmit={handleSubmit(onValid)}>
            <Input {
                ...register("addCategory", {
                    required: "Please typing category",
                })}
                placeholder='You can create category, you want'
                />
            <Btn>Add</Btn>
        </form>
    )
}
export default CreateCategory