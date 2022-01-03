import { Card, Avatar } from "antd";
import { useSelector } from "react-redux";
import { LOAD_USER_REQUEST } from "../reducers/user";
import { rootType } from "../reducers";
import Head from "next/head";
import { END } from "redux-saga";
import wrapper from "../store/configureStore";
import { SagaStore } from "../store/redux";
import AppLayout from "../components/AppLayout";

const About = () => {
  const { userInfo } = useSelector((state: rootType) => state.user);

  return (
    <AppLayout>
      <Head>
        <title>ZeroCho | NodeBird</title>
      </Head>
      {userInfo ? (
        <Card
          actions={[
            <div key="twit">
              짹짹
              <br />
              {userInfo.Posts}
            </div>,
            <div key="following">
              팔로잉
              <br />
              {userInfo.Followings}
            </div>,
            <div key="follower">
              팔로워
              <br />
              {userInfo.Followers}
            </div>,
          ]}
        >
          <Card.Meta avatar={<Avatar>{userInfo.nickname[0]}</Avatar>} title={userInfo.nickname} description="노드버드 매니아" />
        </Card>
      ) : null}
    </AppLayout>
  );
};

export const getStaticProps = wrapper.getStaticProps(store => async (): Promise<any> => {
  store.dispatch({
    type: LOAD_USER_REQUEST,
    data: 1,
  });

  store.dispatch(END);
  await (store as SagaStore).sagaTask.toPromise();
});

export default About;
