import { EllipsisOutlined, HeartOutlined, MessageOutlined, RetweetOutlined } from "@ant-design/icons"
import { Card, Popover, Button } from 'antd'
import Avatar from "antd/lib/avatar/avatar";
import { useSelector } from "react-redux"
import { rootType } from '../reducers';
import PostImages from './PostImages'
interface Props {
    post: {
        id: number,
        User: {
            id: number,
            nickname: string,
        },
        content: string,
        createAt: object,
        Comments: [],
        Images: [],
    }
};

const PostCard = ({ post }: Props) => {
    console.log("post", post)
    const id = useSelector((state: rootType) => state.user.me?.id);

    return (
        <div>
            <Card cover={post.Images[0] && <PostImages images={post.Images} />}
                actions={[
                    <RetweetOutlined />,
                    <HeartOutlined />,
                    <MessageOutlined />,
                    <Popover key="more" content={(
                        <Button.Group>
                            {id && post.User.id === id ? (
                                <>
                                    <Button>수정</Button>
                                    <Button type="primary" danger>삭제</Button>
                                </>
                            ) : (<Button>신고</Button>)}
                        </Button.Group>)}
                    >
                        <EllipsisOutlined />
                    </Popover>
                ]}
            >
                <Card.Meta avatar={<Avatar>{post.User.nickname}</Avatar>}
                    title={post.User.nickname} description={post.content} />
            </Card>
        </div>
    )
}

export default PostCard