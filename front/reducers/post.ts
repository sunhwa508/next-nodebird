import produce from "immer";
import { AnyAction } from "redux";

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
        id: string;
        nickname: string;
      };
      content: string;
    }>;
    me: {
      id: string;
      Posts: Array<object>;
    };
    Likers: Array<{ id: number }>;
  };
}

export interface InitialPostProps {
  mainPosts: [];
  imagePaths: [];
  hasMorePosts: boolean;
  loadPostsLoading: boolean;
  loadPostsDone: boolean;
  loadPostsError: boolean | null;
  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: boolean | null;
  addCommentLoading: boolean;
  addCommentDone: boolean;
  addCommentError: boolean | null;
  removePostLoading: boolean;
  removePostDone: boolean;
  removePostError: boolean | null;
  likePostLoading: boolean;
  likePostDone: boolean;
  likePostError: boolean | null;
  unLikePostLoading: boolean;
  unLikePostDone: boolean;
  unLikePostError: boolean | null;
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
  mainPosts: [],
  imagePaths: [],
  hasMorePosts: true,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  unLikePostLoading: false,
  unLikePostDone: false,
  unLikePostError: null,
};

export const LIKE_POST_REQUEST = "LIKE_POST_REQUEST";
export const LIKE_POST_SUCCESS = "LIKE_POST_SUCCESS";
export const LIKE_POST_FAILURE = "LIKE_POST_FAILURE";

export const UNLIKE_POST_REQUEST = "UNLIKE_POST_REQUEST";
export const UNLIKE_POST_SUCCESS = "UNLIKE_POST_SUCCESS";
export const UNLIKE_POST_FAILURE = "UNLIKE_POST_FAILURE";

export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST";
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE";

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

export const addComment = (data: object) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

// 이전상태를 액션을 통해 다음 상태로 만들어 내는 함수 (단, 불변성은 비키면서)
const reducer = (state = initialPostState, action: AnyAction) => {
  return produce<any>(state, draft => {
    //state 이름이 draft로 바뀐다
    switch (action.type) {
      case LIKE_POST_REQUEST:
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePostError = null;
        break;
      case LIKE_POST_SUCCESS:
        const post = draft.mainPosts.find((v: any) => v.id === action.data.PostId);
        post.Likers.push({ id: action.data.UserId });
        draft.likePostLoading = false;
        draft.likePostDone = true;
        break;

      case LIKE_POST_FAILURE:
        draft.likePostLoading = false;
        draft.likePostError = action.error;
        break;
      case UNLIKE_POST_REQUEST:
        draft.unLinkPostLoading = true;
        draft.unLinkPostDone = false;
        draft.unLinkPostError = null;
        break;
      case UNLIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find((v: { [key: string]: number }) => v.id == action.data.PostId);
        post.Likers = post.Likers.filter((v: { [key: string]: number }) => v.id !== action.data.UserId);
        draft.unlikePostLoading = false;
        draft.unlikePostDone = true;
        break;
      }
      case UNLIKE_POST_FAILURE:
        draft.unLinkPostLoading = false;
        draft.unLinkPostError = action.error;
        break;
      case LOAD_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      case LOAD_POSTS_SUCCESS:
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.mainPosts = draft.mainPosts.concat(action.data);
        draft.hasMorePosts = action.data.length === 10;
        break;
      case LOAD_POSTS_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(action.data);
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
        draft.mainPosts = draft.mainPosts.filter((v: { [key: string]: string }) => v.id !== action.data);
        draft.removePostLoading = false;
        draft.removePostDone = true;
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentError = null;
        draft.addCommentDone = false;
        break;
      case ADD_COMMENT_SUCCESS: {
        const post = draft.mainPosts.find((v: any) => v.id === action.data.PostId);
        post.Comments.unshift(action.data);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
        // const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId);
        // const post = { ...state.mainPosts[postIndex] };
        // post.Comments = [dummyComment(action.data.content), ...post.Comments];
        // const mainPosts = [...state.mainPosts];
        // mainPosts[postIndex] = post;
        // return {
        //   ...state,
        //   mainPosts,
        //   addCommentLoading: false,
        //   addCommentDone: true,
        // };
      }
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;
