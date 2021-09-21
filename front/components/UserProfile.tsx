import { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_OUT_REQUEST } from '../reducers/user';
import { rootType } from '../reducers';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state: rootType) => state.user);

  const onLogOut = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">
          짹짹
          <br /> {me?.Posts.length}
        </div>,
        <div key="followings">
          팔로잉
          <br />
          {me?.Followings.length}
        </div>,
        <div key="followers">
          팔로워
          <br /> {me?.Followings.length}
        </div>,
      ]}
    >
      <Card.Meta title={me?.nickname} avatar={<Avatar>{me?.nickname[0] || "닉네임"}</Avatar>} />
      <Button onClick={onLogOut} loading={logOutLoading}>
        로그아웃
      </Button>
    </Card>
  );
};

export default UserProfile;
