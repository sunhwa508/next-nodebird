import { AnyAction } from 'redux';
import shortId from 'shortid';

export interface InitialPostElementProps {
  post: {
    id: number;
    User: {
      id: number;
      nickname: string;
    };
    content: string;
    Images: Array<{ src: string }>;
    Comments: Array<{
      User: {
        nickname: string;
      };
      content: string;
    }>;
  };
}

export interface InitialPostProps {
  mainPosts: [
    {
      id: number;
      User: {
        id: number;
        nickname: string;
      };
      content: string;
      Images?: Array<{ src: string }>;
      Comments: Array<{
        User: {
          nickname: string;
        };
        content: string;
      }>;
    },
  ];
  imagePaths: [];
  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: boolean | null;
  addCommentLoading: boolean;
  addCommentDone: boolean;
  addCommentError: boolean | null;
}

export interface CommentsProps {
  User: {
    nickname: string;
  };
  content: string;
}

// 1. 데이터 구성
// 2. 액션 구성
// 3. 리듀서 구성
// 4. 화면 구성
const initialPostState: InitialPostProps = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: '선화초',
      },
      content: '첫 번째 게시글 #해시태그 #익스프레스',
      Images: [
        {
          src: 'http://gdimg.gmarket.co.kr/1528813522/still/600?ver=1543595810',
        },
        {
          src: 'http://gdimg.gmarket.co.kr/1528813522/still/600?ver=1543595810',
        },
        {
          src: 'http://gdimg.gmarket.co.kr/1528813522/still/600?ver=1543595810',
        },
      ],
      Comments: [
        {
          User: {
            nickname: 'nero',
          },
          content: ' 우와 개정판이 나왓군요',
        },
        {
          User: {
            nickname: 'hero',
          },
          content: '얼른 사고싶어요!',
        },
      ],
    },
  ],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPost = (data: InitialPostElementProps) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data: any) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummyPost = (data: string) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: '제로초',
  },
  Images: [
    {
      src: '',
    },
  ],
  Comments: [],
});

const dummyComment = (data: string) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: '제로초',
  },
});

const reducer = (state = initialPostState, action: AnyAction) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostError: null,
        addPostDone: false,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost(action.data), ...state.mainPosts],
        addPostLoading: false,
        addPostDone: false,
      };
    case ADD_POST_FAILURE:
      return {
        addPostLoading: false,
        addPostError: action.error,
      };

    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentError: null,
        addCommentDone: false,
      };
    case ADD_COMMENT_SUCCESS: {
      const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
      const post = { ...state.mainPosts[postIndex] };
      post.Comments = [dummyComment(action.data.content), ...post.Comments];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = post;
      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addCommentDone: true,
      };
    }
    case ADD_COMMENT_FAILURE:
      return {
        addCommentLoading: false,
        addCommentError: action.error,
      };

    default:
      return state;
  }
};

export default reducer;
