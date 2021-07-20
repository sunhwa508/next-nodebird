import { AnyAction } from 'redux'
export interface InitialPostProps {
    mainPosts: [{
        id: number,
        User: {
            id: number,
            nickname: string,
        },
        content: string,
        Images: Array<{ src: string }>
        Comments: Array<{
            User: {
                nickname: string,
            },
            content: string
        }>,
    }],
    imagePaths: [],
    postAdded: boolean,
}

export interface CommentsProps {
    User: {
        nickname: string;
    };
    content: string;
}

export interface InitialPostElementProps {
    post: {
        id: number,
        User: {
            id: number,
            nickname: string,
        },
        content: string,
        Images: Array<{ src: string }>
        Comments: Array<{
            User: {
                nickname: string,
            },
            content: string
        }>,
    }
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
                src: 'http://gdimg.gmarket.co.kr/1528813522/still/600?ver=1543595810'
            },
            {
                src: 'http://gdimg.gmarket.co.kr/1528813522/still/600?ver=1543595810'
            },
            {
                src: 'http://gdimg.gmarket.co.kr/1528813522/still/600?ver=1543595810'
            },
        ],
        Comments: [{
            User: {
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
    Images: [
        {
            src: 'http://gdimg.gmarket.co.kr/1528813522/still/600?ver=1543595810'
        },
    ],
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