import { atom, selector } from 'recoil'
import { recoilPersist } from 'recoil-persist';

// localstorge 에서 recoil 값 유지.
const { persistAtom } = recoilPersist();

export interface IToDo {
    text: string;
    id: number;
    category: string;
}

/* 
Enums

열거형은 TypeScript가 제공하는 기능 중 하나입니다.
enum은 열거형으로 이름이 있는 상수들의 집합을 정의할 수 있습니다 : 수정불가함
열거형을 사용하면 의도를 문서화 하거나 구분되는 사례 집합을 더 쉽게 만들수 있습니다. 
TypeScript는 숫자와 문자열-기반 열거형을 제공합니다. 
*/
export const categoryState = atom<string[]>({
    key: "category",
    default: [
        "TO_DO",
        "DOING",
        "DONE",
    ],
    effects_UNSTABLE: [persistAtom],
})

export const currentCategoryState = atom<string>({
    key: "currentCategory",
    default: "TO_DO",
    effects_UNSTABLE: [persistAtom],
})

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
    effects_UNSTABLE: [persistAtom],
})

/* 
    Selector

    Selector는 파생된 state(derived state)의 일부를 나타낸다.
    즉, 기존 state를 가져와서, 기존 state를 이용해 새로운 state를 만들어서 반환할 수 있다. 
    기존 state를 이용만할 뿐 변형시키지 않는다. 
    derived state는 다른 데이터에 의존하는 동적인 데이터를 만들 수 있기 때문에 강력한 개념이다.
 */

// 카테고리별.
export const toDoSelector = selector({
    key: "toDoSelector",
    // option 객체의 get function
    get: ({get}) => {
        const toDos = get(toDoState); // ATOM 을 가져와 사용.(ATOM 에 의존적)
        const categories = get(categoryState);
        const currentCategory = get(currentCategoryState);
        let matchCategory: string;
        
        // map 함수 안에 return 을 해주면 toDos 제대로 작동안함( 예외 경우가 생기는 듯 )
        categories.map((category)=>{
            console.log("카테고리",category);
            console.log("현재 카테고리",currentCategory);
            console.log(category === currentCategory);
            if (category === currentCategory) matchCategory = category;
        })

        return toDos.filter((toDo) => toDo.category === matchCategory);

    }
})
