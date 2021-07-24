import { useCallback } from 'react'
import { Card, Avatar, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { logoutRequestAction } from '../reducers/user'
import { rootType } from '../reducers'

const UserProfile = () => {
    const dispatch = useDispatch();
    const { me, logOutLoading } = useSelector((state: rootType) => state.user);

    const onLogOut = useCallback(() => {
        dispatch(logoutRequestAction());
    }, [])

    return (
        <Card actions={[
            <div key="twit">짹짹<br /> 0 </div>,
            <div key="followings">팔로잉<br /> 0 </div>,
            <div key="followers">팔로워<br /> 0 </div>
        ]}>
            <Card.Meta
                title={me?.nickname}
                avatar={<Avatar>{me?.nickname[0]}</Avatar>} />
            <Button onClick={onLogOut} loading={logOutLoading}>로그아웃</Button>
        </Card>
    )
}

export default UserProfile