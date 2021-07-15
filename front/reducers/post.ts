import { AnyAction } from 'redux'
export interface InitialPostProps {
    mainPosts: [{
        id: number,
        User: {},
        content: string,
        Images: Array<object>
        Comments: Array<object>
    }],
    imagePaths: [],
    postAdded: boolean,
}

// 1. 데이터 구성
// 2. 액션 구성
// 3. 리듀서 구성
// 4. 화면 구성
const initialPostState: InitialPostProps = {
    mainPosts: [{
        id: 1,
        User: {
            id: 1,
            nickname: '선화초',
        },
        content: '첫 번째 게시글 #해시태그 #익스프레스',
        Images: [
            {
                src: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Ffunshop.akamaized.net%2Fproducts%2F0000055079%2Fvs_image800.jpg&imgrefurl=https%3A%2F%2Fm.funshop.co.kr%2Fgoods%2Fdetail%2F55079&tbnid=kqT8Aui_rJsrgM&vet=12ahUKEwj91I_zseTxAhWUDN4KHbrzBpwQMygCegUIARDIAQ..i&docid=6g21QOZOCIOwgM&w=800&h=800&q=%EB%AA%AC%EC%8A%A4%ED%84%B0%EC%A3%BC%EC%8B%9D%ED%9A%8C%EC%82%AC&ved=2ahUKEwj91I_zseTxAhWUDN4KHbrzBpwQMygCegUIARDIAQ'
            },
            {
                src: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Ffunshop.akamaized.net%2Fproducts%2F0000055079%2Fvs_image800.jpg&imgrefurl=https%3A%2F%2Fm.funshop.co.kr%2Fgoods%2Fdetail%2F55079&tbnid=kqT8Aui_rJsrgM&vet=12ahUKEwj91I_zseTxAhWUDN4KHbrzBpwQMygCegUIARDIAQ..i&docid=6g21QOZOCIOwgM&w=800&h=800&q=%EB%AA%AC%EC%8A%A4%ED%84%B0%EC%A3%BC%EC%8B%9D%ED%9A%8C%EC%82%AC&ved=2ahUKEwj91I_zseTxAhWUDN4KHbrzBpwQMygCegUIARDIAQ'
            },
            {
                src: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Ffunshop.akamaized.net%2Fproducts%2F0000055079%2Fvs_image800.jpg&imgrefurl=https%3A%2F%2Fm.funshop.co.kr%2Fgoods%2Fdetail%2F55079&tbnid=kqT8Aui_rJsrgM&vet=12ahUKEwj91I_zseTxAhWUDN4KHbrzBpwQMygCegUIARDIAQ..i&docid=6g21QOZOCIOwgM&w=800&h=800&q=%EB%AA%AC%EC%8A%A4%ED%84%B0%EC%A3%BC%EC%8B%9D%ED%9A%8C%EC%82%AC&ved=2ahUKEwj91I_zseTxAhWUDN4KHbrzBpwQMygCegUIARDIAQ'
            },
        ],
        Comments: [{
            user: {
                nickname: 'nero'
            },
            content: ' 우와 개정판이 나왓군요'
        },
        {
            User: {
                nickname: 'hero',
            },
            content: '얼른 사고싶어요!',
        }]
    }],
    imagePaths: [],
    postAdded: false
};

const ADD_POST = 'ADD_POST';
export const addPost = {
    type: ADD_POST
}

const dummyPost = {
    id: 2,
    content: '더미데이터 입니다',
    User: {
        id: 1,
        nickname: '제로초',
    },
    Images: [],
    Comments: [],
}

const reducer = (state = initialPostState, action: AnyAction) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts],
                postAdded: true
            }
        default:
            return state;
    }
}

export default reducer