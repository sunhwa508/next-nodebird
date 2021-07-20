import { Form, Input } from 'antd'
import React, { useCallback, useMemo } from 'react';
import { InitialPostElementProps } from '../reducers/post';
import useInput from '../hooks/useInput'
import { Button } from 'antd'
import { useSelector } from 'react-redux';
import { rootType } from '../reducers/index'

const CommentForm = ({ post }: InitialPostElementProps) => {
    const id = useSelector((state: rootType) => state.user.me?.id)
    const [commentText, onChangeCommentText] = useInput('');
    const onSubmitComment = useCallback(() => {
        console.log(post.id, commentText)
    }, [commentText]);

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