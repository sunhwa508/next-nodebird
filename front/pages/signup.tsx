import React, { useState, useCallback, useEffect } from 'react';
import AppLayout from '../components/AppLayout'
import Head from 'next/head'
import { Form, Input, Checkbox, Button } from 'antd'
import useInput from '../hooks/useInput'
import styled from 'styled-components'
import { SIGN_UP_REQUEST } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router'
import { rootType } from '../reducers';

const ErrorMessage = styled.div`
    color: red;
`;
const SubmitButton = styled.div`
    margin-top:10px;
`
const Signup = () => {
    const dispatch = useDispatch();
    const {signUpLoading, signUpDone, signUpError, me } = useSelector((state: rootType)=> state.user);

    // 뒤로가기했을때 페이지 나오지 않게 하려면 push => replace
    useEffect(() => {
        if(me && me.id){
            Router.replace('/')
        }
    }, [me && me.id]);

    useEffect(() => {
        if(signUpDone){
            Router.replace('/')
        }
    }, [signUpDone]);

    useEffect(() => {
        if(signUpError){
          alert(signUpError);
        }
    }, [signUpError]);

    const [email, onChangeEmail] = useInput('');
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
        dispatch({
            type:SIGN_UP_REQUEST,
            data:{email, password, nickname},
        })
        console.log(email, nickname, password)
    }, [password, passwordCheck, term])

    return (
        <AppLayout>
            <Head>
                <meta charSet="utf-8" />
                <title>회원가입 | NodeBird</title>
            </Head>
            <Form onFinish={onSubmit}>
                <div>
                    <label htmlFor="user-email">이메일</label>
                    <br />
                    <Input name="user-email" value={email} onChange={onChangeEmail} required />
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
                    <label htmlFor="user-password-check">비밀번호체크</label>
                    <br />
                    <Input name="user-password-check" type="password" value={passwordCheck} onChange={onChangePasswordCheck} required />
                    {passwordError && <ErrorMessage> 비밀번호가 일치하지 않습니다.</ErrorMessage>}
                </div>
                <div>
                    <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>내 말을 잘 들을 것을 동의합니다.</Checkbox>
                    {termError && <ErrorMessage> 약관에 동의 하셔야 합니다! </ErrorMessage>}
                </div>
                <SubmitButton>
                    {/* htmlType="submit" 설정시 form 의 onfinish={} 가 호출됩니다. */}
                    <Button type="primary" htmlType="submit" loading={signUpLoading}>가입하기</Button>
                </SubmitButton>
            </Form>
        </AppLayout>
    )
}

export default Signup;