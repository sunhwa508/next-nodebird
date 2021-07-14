import React from 'react'
import Link from 'next/link'
import { Menu, Input, Row, Col } from 'antd'
import UserProfile from './UserProfile'
import LoginForm from './LoginForm'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { InitialStateProps } from '../reducers'

const SearchInput = styled(Input.Search)`
    vertical-align: middle;
`;

interface Props {
    children: React.ReactNode;
};


const AppLayout = ({ children }: Props) => {
    const isLoggedIn = useSelector((state: InitialStateProps) => state.user.isLoggedIn)

    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item key="1">
                    <Link href="/"><a>노드버드</a></Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link href="/profile"><a>프로필</a></Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <SearchInput enterButton />
                </Menu.Item>
                <Menu.Item key="4">
                    <Link href="/signup"><a>회원가입</a></Link>
                </Menu.Item>
            </Menu>
            {/* gutter => column 사이의 간격 */}
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    {isLoggedIn ? <UserProfile /> : <LoginForm />}
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    <a href="" target="_blank" rel="noreferrer noopener"> Made by sunhwalee </a>
                </Col>
            </Row>
        </div>
    )
}

export default AppLayout
