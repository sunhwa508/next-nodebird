import { useState, useCallback } from "react";
import { EllipsisOutlined, MessageOutlined, RetweetOutlined, HeartTwoTone } from "@ant-design/icons";
import { Card, Popover, Button, List, Comment } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { useSelector, useDispatch } from "react-redux";
import { rootType } from "../reducers";
import PostImages from "./PostImages";
import { InitialPostElementProps, CommentsProps, REMOVE_POST_REQUEST } from "../reducers/post";
import CommentForm from "./CommentForm";
import PostCardContent from "./PostCardContent";
import FollowButton from "./FollowButton";
import { LIKE_POST_REQUEST, UNLIKE_POST_REQUEST } from "../reducers/post";
const PostCard = ({ post }: InitialPostElementProps) => {
  const { removePostLoading } = useSelector((state: rootType) => state.post);
  const [commentFormOpened, setCommentFormOpened] = useState(false);

  const onLike = useCallback(() => {
    dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  const onUnLike = useCallback(() => {
    dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  const id = useSelector((state: rootType) => state.user.me?.id);
  const dispatch = useDispatch();

  const onToggleComment = useCallback(() => {
    setCommentFormOpened(prev => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  const liked = post.Likers.find(v => v.id === id);

  return (
    <div>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined />,
          liked ? (
            <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onUnLike} />
          ) : (
            <HeartTwoTone key="heart" onClick={onLike} />
          ),
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button type="primary" loading={removePostLoading} onClick={onRemovePost}>
                      삭제
                    </Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        extra={id && <FollowButton post={post} />}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postData={post.content} />}
        />
      </Card>
      {commentFormOpened && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item: CommentsProps) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  content={item.content}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                ></Comment>
              </li>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default PostCard;
