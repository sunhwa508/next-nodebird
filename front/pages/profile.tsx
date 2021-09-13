import React ,{useEffect}from 'react';
import AppLayout from '../components/AppLayout'
import Head from 'next/head'
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import { rootType } from '../reducers';
import { useSelector } from 'react-redux';
import Router from 'next/router'

const Profile = () => {
    const { me }  = useSelector((state: rootType)=> state.user);
    const followerList = [{ nickname: '제로초' }, { nickname: '바보' }, { nickname: '노드버드 오피셜' }]
    const followingList = [{ nickname: '제로초' }, { nickname: '바보' }, { nickname: '노드버드 오피셜' }]

    useEffect(() => {
        if(!(me && me.id)){
            Router.push('/');
        }
    }, [me && me.id]);
    if(!me){
        return null;
    }
    
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>내 프로필 | NodeBird</title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                <FollowList header="팔로잉 목록" data={followingList} />
                <FollowList header="팔로워 목록" data={followerList} />
            </AppLayout>
        </>
    )
}

export default Profile;