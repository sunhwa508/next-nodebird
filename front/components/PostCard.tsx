import { useState, useCallback } from 'react';
import { EllipsisOutlined, MessageOutlined, RetweetOutlined, HeartTwoTone } from '@ant-design/icons';
import { Card, Popover, Button, List, Comment } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { useSelector } from 'react-redux';
import { rootType } from '../reducers';
import PostImages from './PostImages';
import { InitialPostElementProps, CommentsProps } from '../reducers/post';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';

const PostCard = ({ post }: InitialPostElementProps) => {
  const [liked, useLiked] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const id = useSelector((state: rootType) => state.user.me?.id);

  const onToggleLike = useCallback(() => {
    useLiked((prev) => !prev);
  }, []);
  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  return (
    <div>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined />,
          liked ? (
            <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLike} />
          ) : (
            <HeartTwoTone key="heart" onClick={onToggleLike} />
          ),
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button type="primary" danger>
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
