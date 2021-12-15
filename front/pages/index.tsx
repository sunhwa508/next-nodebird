import { useDispatch, useSelector } from "react-redux";
import { rootType } from "../reducers";
import AppLayout from "../components/AppLayout";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { useEffect } from "react";
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import { LOAD_MY_INFO_REQUEST , LOAD_USER_REQUEST} from "../reducers/user";
import wrapper from '../store/configureStore'
import { GetServerSideProps } from "next";
import { ConfigContext } from "antd/lib/config-provider";
import { END } from 'redux-saga';
const Home = () => {
  const { me } = useSelector((state: rootType) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading, retweetError } = useSelector((state: rootType) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (retweetError) {
      alert(retweetError);
    }
  }, [retweetError]);

  useEffect(() => {
    function onScroll() {
      const { clientHeight, scrollHeight } = document.documentElement;
      if (window.scrollY + clientHeight > scrollHeight - 300) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId,
          });
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePosts, mainPosts, loadPostsLoading]);

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((post: any) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

//이부분이 Home 컴포넌트 보다 먼저 실행된다.
export const getServerSideProps = wrapper.getServerSideProps(async (store) => {
  store.dispatch({
    type: LOAD_USER_REQUEST,
  });
  store.dispatch({
    type: LOAD_POSTS_REQUEST,
  });
  store.dispatch(END)
  await store.sagaTask.toPromise()
})

export default Home;
