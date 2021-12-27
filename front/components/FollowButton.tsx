import React, { useCallback } from "react";
import { InitialPostElementProps } from "../reducers/post";
import { Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { rootType } from "../reducers";
import { UN_FOLLOW_REQUEST, FOLLOW_REQUEST } from "../reducers/user";

const FollowButton = ({ post }: InitialPostElementProps) => {
  const { me, followLoading, unfollowLoading } = useSelector((state: rootType) => state.user);
  const isFollowing = me?.Followings.find((v: any) => v.id === post.User.id);
  const dispatch = useDispatch();

  const onClickButton = useCallback(() => {
    if (isFollowing) {
      dispatch({
        type: UN_FOLLOW_REQUEST,
        data: post.User.id,
      });
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: post.User.id,
      });
    }
  }, [isFollowing]);

  if (post?.User?.id === me.id) {
    return null;
  }
  return (
    <Button loading={followLoading || unfollowLoading} onClick={onClickButton}>
      {isFollowing ? "언팔로우" : "팔로우"}
    </Button>
  );
};
export default FollowButton;
