import React, { useState, useMemo, useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link'
import styled from 'styled-components'
interface props {
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const FormWrapper = styled(Form)`
    padding: 10px;
`;
const LoginForm = ({ setIsLoggedIn }: props) => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const style = useMemo(() => ({ marginTop: 10 }), [])

    const onChangeId = useCallback((e) => {
        setId(e.target.value);
    }, [])


    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
    }, [])

    const onSubmitForm = useCallback(() => {
        console.log(id, password);
        setIsLoggedIn(true);
    }, [id, password])

    return (
        // onFinish 는 이미 e.preventdefault가 적용되어있다.
        <FormWrapper onFinish={onSubmitForm}>
            <div>
                <label htmlFor="user-id">아이디</label>
                <br />
                <Input name="user-id" value={id} onChange={onChangeId} required />
            </div>
            <div>
                <label htmlFor="user-password">비밀번호</label>
                <br />
                <Input
                    name="user-password"
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                    required
                />
            </div>
            <div style={style}>
                <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
                <Link href="/signup"><a><Button>회원가입</Button></a></Link>
            </div>
        </FormWrapper>
    )
}

export default LoginForm