import React, { useState, useCallback } from 'react';
import AppLayout from '../components/AppLayout'
import Head from 'next/head'
import { Form, Input, Checkbox, Button } from 'antd'
import useInput from '../hooks/useInput'
import styled from 'styled-components'

const ErrorMessage = styled.div`
    color: red;
`;
const SubmitButton = styled.div`
    margin-top:10px;
`
const Signup = () => {
    const [id, onChangeId] = useInput('');
    const [nickname, onChangeNickname] = useInput('');

    const [password, onChangePassword] = useInput('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const [term, setTerm] = useState(false)
    const [termError, setTermError] = useState(false);

    const onChangePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value);
        setPasswordError(e.target.value !== password)
    }, [password]);

    const onChangeTerm = useCallback((e) => {
        setTerm(prev => !prev)
        setTermError(term)
    }, [term, termError])

    const onSubmit = useCallback(() => {
        if (password !== passwordCheck) {
            return setPasswordError(true)
        }
        if (!term) {
            return setTermError(true)
        }
        console.log(id, nickname, password)
    }, [password, passwordCheck, term])

    return (
        <AppLayout>
            <Head>
                <meta charSet="utf-8" />
                <title>회원가입 | NodeBird</title>
            </Head>
            <Form onFinish={onSubmit}>
                <div>
                    <label htmlFor="user-id">아이디</label>
                    <br />
                    <Input name="user-id" value={id} onChange={onChangeId} required />
                </div>
                <div>
                    <label htmlFor="user-nickname">닉네임</label>
                    <br />
                    <Input name="user-nickname" value={nickname} onChange={onChangeNickname} required />
                </div>
                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <br />
                    <Input name="user-password" value={password} onChange={onChangePassword} required />
                </div>
                <div>
                    <label htmlFor="user-id">비밀번호체크</label>
                    <br />
                    <Input name="user-password-check" type="password" value={passwordCheck} onChange={onChangePasswordCheck} required />
                    {passwordError && <ErrorMessage> 비밀번호가 일치하지 않습니다.</ErrorMessage>}
                </div>
                <div>
                    <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>내 말을 잘 들을 것을 동의합니다.</Checkbox>
                    {termError && <ErrorMessage> 약관에 동의 하셔야 합니다! </ErrorMessage>}
                </div>
                <SubmitButton>
                    {/* htmlType="submit" 설정시 form 의 onfinicsh={} 가 호출됩니다. */}
                    <Button type="primary" htmlType="submit">가입하기</Button>
                </SubmitButton>
            </Form>
        </AppLayout>
    )
}

export default Signup;