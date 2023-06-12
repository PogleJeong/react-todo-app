import { IToDo, categoryState, toDoState } from '../atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

const Item = styled.li`
    min-height: 40px;
    border: none;
    border-radius: 10px;
    list-style: none;
`

const Text = styled.span`
    display: inline-block;
    font-size: 18px;
    min-width: 200px;
`

const RemoveBtn = styled.button`
    color: white;
    background-color: tomato;
`


function ToDo({text, id, category}: IToDo) {
    const setToDos = useSetRecoilState(toDoState);
    const categories = useRecoilValue(categoryState);
    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: { name },
        } = event;
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
            const newToDo = { text, id, category: name as any};
            return [
                ...oldToDos.slice(0,targetIndex),
                newToDo,
                ...oldToDos.slice(targetIndex+1)
            ];
        })
    }
    const removeBtn = () => {
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
            return [
                ...oldToDos.slice(0,targetIndex),
                ...oldToDos.slice(targetIndex+1)
            ];
        })
    }
    return(
        <Item>
            <Text>{text}</Text>
            {categories.map((currentCategory, index)=> (
                category !== currentCategory && <button key={index} name={currentCategory} onClick={onClick}>{currentCategory}</button>
            ))}
            <RemoveBtn onClick={removeBtn}>Remove</RemoveBtn>
        </Item>
    );
}

export default ToDo;