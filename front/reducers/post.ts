import produce from "immer";
import { AnyAction } from "redux";
import shortId from "shortid";

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
    me: {
      id: string;
      Posts: Array<object>;
    };
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
      Images?: Array<{ src: string; id: string }>;
      Comments: Array<{
        id: string;
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
  removePostLoading: boolean;
  removePostDone: boolean;
  removePostError: boolean | null;
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
        nickname: "선화초",
      },
      content: "첫 번째 게시글 #해시태그 #익스프레스",
      Images: [
        {
          id: shortId.generate(),
          src: "http://gdimg.gmarket.co.kr/1528813522/still/600?ver=1543595810",
        },
        {
          id: shortId.generate(),
          src: "http://gdimg.gmarket.co.kr/1528813522/still/600?ver=1543595810",
        },
        {
          id: shortId.generate(),
          src: "http://gdimg.gmarket.co.kr/1528813522/still/600?ver=1543595810",
        },
      ],
      Comments: [
        {
          id: shortId.generate(),
          User: {
            nickname: "nero",
          },
          content: " 우와 개정판이 나왓군요",
        },
        {
          id: shortId.generate(),
          User: {
            nickname: "hero",
          },
          content: "얼른 사고싶어요!",
        },
      ],
    },
  ],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const removePost = (data: InitialPostElementProps) => ({
  type: REMOVE_POST_REQUEST,
  data,
});

export const addPost = (data: InitialPostElementProps) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data: any) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummyPost = (data: { id: string; content: string }) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: "제로초",
  },
  Images: [
    {
      src: "",
    },
  ],
  Comments: [],
});

const dummyComment = (data: string) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: "제로초",
  },
});
// 이전상태를 액션을 통해 다음 상태로 만들어 내는 함수 (단, 불변성은 비키면서)
const reducer = (state = initialPostState, action: AnyAction) => {
  return produce<any>(state, draft => {
    //state 이름이 draft로 바뀐다

    switch (action.type) {
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts = [dummyPost(action.data), ...state.mainPosts];
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostError = null;
        draft.removePostDone = false;
        break;
      case REMOVE_POST_SUCCESS:
        draft.mainPosts = state.mainPosts.filter(v => v.id === action.data);
        draft.removePostLoading = false;
        draft.removePostDone = true;
        break;
      case REMOVE_POST_FAILURE:
        return {
          removePostLoading: false,
          removePostError: action.error,
        };

      case ADD_COMMENT_REQUEST:
        return {
          ...state,
          addCommentLoading: true,
          addCommentError: null,
          addCommentDone: false,
        };
      case ADD_COMMENT_SUCCESS: {
        const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId);
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
  });
};

export default reducer;
