import { Form, Input, Button } from 'antd';
import React, { useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { rootType } from '../reducers';
import { addPost } from '../reducers/post'

const StyledForm = styled(Form)`
    margin: '10px 0 20px';
`
const StyledButton = styled(Button)`
    float: 'right';
`;

const PostForm = () => {
    const { imagePaths } = useSelector((state: rootType) => state.post);
    // Ref 실제 dom 에 접근하기 위해 사용된다.
    const imageInput = useRef()

    const onClickImageUpload = useCallback(() => {
        imageInput.current.click()
    }, [imageInput.current])

    const [text, setText] = useState('');
    const onChangeText = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value)
    }, [])

    const dispatch = useDispatch();
    const onSubmit = useCallback(() => {
        dispatch(addPost)
        setText('')
    }, [])

    return (
        <StyledForm encType="multipart/form-data" onFinish={onSubmit}>
            <Input.TextArea value={text} onChange={(e) => onChangeText(e)} maxLength={140} placeholder="어떤 일이 있었나요~?" />
            <div>
                <input type="file" multiple hidden ref={imageInput} />
                <StyledButton onClick={onClickImageUpload}>이미지 업로드</StyledButton>
                <StyledButton type="primary" htmlType="submit">짹짹</StyledButton>
            </div>
            <div>
                {imagePaths.map((v: any) => (
                    <div key={v} style={{ display: 'inline-block' }}>
                        <img src={v} style={{ width: '200px' }} alt={v} />
                        <div>
                            <button>제거</button>
                        </div>
                    </div>
                ))}
            </div>
        </StyledForm>
    )
}
export default PostForm