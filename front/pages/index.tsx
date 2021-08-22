import { useDispatch, useSelector } from "react-redux";
import { rootType } from "../reducers";
import AppLayout from "../components/AppLayout";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { useEffect } from "react";
import { LOAD_POSTS_REQUEST } from "../reducers/post";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  },[]);
  

  const { me } = useSelector((state: rootType) => state.user);
  const { mainPosts } = useSelector((state: rootType) => state.post);

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((post: any) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export default Home;
