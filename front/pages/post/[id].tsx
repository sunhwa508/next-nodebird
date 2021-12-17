// post/[id].ts
import { END } from "@redux-saga/core";
import axios from "axios";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { useSelector } from "react-redux";
import AppLayout from "../../components/AppLayout";
import PostCard from "../../components/PostCard";
import { rootType } from "../../reducers";
import { LOAD_POST_REQUEST } from "../../reducers/post";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import wrapper from "../../store/configureStore";
import { SagaStore } from "../../store/redux";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const { singlePost } = useSelector((state: rootType) => state.post);

  return (
    <AppLayout>
      <PostCard post={singlePost} />
      {/* <div>{id}번게시글</div> */}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, params }): Promise<any> => {
  console.log(params);
  const cookie = req ? req.headers.cookie : "";
  axios.defaults.headers.Cookie = "";
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  store.dispatch({
    type: LOAD_POST_REQUEST,
    data: params?.id,
  });
  store.dispatch(END);
  await (store as SagaStore).sagaTask.toPromise();
});

export default Post;
