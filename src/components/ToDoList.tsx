import { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import styled from 'styled-components';

import { categoryState, currentCategoryState, toDoSelector, toDoState } from '../atoms';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';
import CreateCategory from './CreateCategory';

const Wrapper = styled.div`
    width: 100%;
    min-height: 1000px;
    padding: 10% 20%;
`

const Title = styled.h1`
    font-size: 32px;
    font-weight: bold;
`

const Select = styled.select`
    width: 200px;
    height: 40px;
    font-size: 18px;
`

const OptionBar = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(10px, 1fr));
    margin: 20px 0px;
`

// react hook form
// register 는 태그안의 value, onChange 등 정볼르 가지고 있음
// watch 는 useForm의 입력값들의 변화를 관찰 할 수 있음
// handlesubmit 은 form submit 할 떄 유효성검사의 성공 및 실패시 함수를 호출하게 해줌
// formState 는 현재 에러가 발생하는 state 를 볼 수 있음 (에러내용 보여줌)
function ToDoList() {
    
    const toDos = useRecoilValue(toDoSelector);
    const categories = useRecoilValue(categoryState);
    const [currentCategory, setCurrentCategory] = useRecoilState(currentCategoryState);

    useEffect(()=>{
    
    })

    const onInput = (event:React.FormEvent<HTMLSelectElement>) => {
        // typescript 가 보기에는 option value 는 단지 String 으로 취급, option value 와 categories type과 같다는 것을 보름
        setCurrentCategory(event.currentTarget.value as any);
    }
    return (
        <Wrapper>
            <Title>To Do List!</Title>
            <hr/>
            <OptionBar>
                <Select value={currentCategory} onInput={onInput}>
                {categories.map((key,index)=>(
                    <option key={index} value={key}>{key}</option>
                ))}
                </Select>
                <CreateToDo />
                <CreateCategory />
            </OptionBar>
            {toDos?.map((toDo: any)=>(
                <ToDo key={toDo.id} {...toDo} />
            ))}

        </Wrapper>
            
    )
}

/* function ToDoList() {
    const [ toDo, setToDo ]= useState("");
    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        const {
            currentTarget: { value },
        } = event;
        setToDo(value);
    }
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(toDo);
    }
    return (
        <div>
            <form onSubmit={onSubmit} >
                <input onChange={onChange} value={toDo} placeholder='write to do list' />
                <button>헤에</button>
            </form>
        </div>
            
    )
} */

export default ToDoList;