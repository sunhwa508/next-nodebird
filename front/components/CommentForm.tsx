import { Form, Input } from 'antd'
import React, { useCallback, useEffect, useMemo } from 'react';
import { ADD_COMMENT_REQUEST, InitialPostElementProps } from '../reducers/post';
import useInput from '../hooks/useInput'
import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { rootType } from '../reducers/index'

const CommentForm = ({ post }: InitialPostElementProps) => {
    const dispatch = useDispatch();
    const { addCommentDone } = useSelector((state: rootType) => state.post)
    const id = useSelector((state: rootType) => state.user.me?.id)
    const [commentText, onChangeCommentText, setCommentText] = useInput('');

    useEffect(() => {
        if (addCommentDone) {
            setCommentText('');
        }
    }, [addCommentDone]);

    const onSubmitComment = useCallback(() => {
        console.log(post.id, commentText)
        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: { content: commentText, postId: post.id, userId: id }
        });
    }, [commentText, id]);

    return (
        <Form onFinish={onSubmitComment}>
            <Form.Item style={{ position: 'relative', margin: 0 }}>
                <Input.TextArea value={commentText} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChangeCommentText(e)} rows={4} />
                <Button style={{ position: 'absolute', right: 0, bottom: -40 }} type="primary" htmlType="submit">삐약</Button>
            </Form.Item>
        </Form>
    )
}

export default CommentForm