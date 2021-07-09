import { useCallback } from 'react'
import { Card, Avatar, Button } from 'antd'

interface Props {
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const UserProfile = ({ setIsLoggedIn }: Props) => {
    const onLogOut = useCallback(() => {
        setIsLoggedIn(false)
    }, [])

    return (
        <Card actions={[
            <div key="twit">짹짹<br /> 0 </div>,
            <div key="followings">팔로잉<br /> 0 </div>,
            <div key="followers">팔로워<br /> 0 </div>
        ]}>
            <Card.Meta title="Sunhwa" avatar={<Avatar>SH</Avatar>} />
            <Button onClick={onLogOut}>로그아웃</Button>
        </Card>
    )
}

export default UserProfile