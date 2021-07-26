import { useSelector } from 'react-redux';
import { rootType } from '../reducers'
import AppLayout from '../components/AppLayout'
import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'

const Home = () => {
    const { logInDone } = useSelector((state: rootType) => state.user);
    const { mainPosts } = useSelector((state: rootType) => state.post);

    return (
        <AppLayout>
            {logInDone && <PostForm />}
            {mainPosts.map((post: any) => <PostCard key={post.id} post={post} />)}
        </AppLayout>
    )
}

export default Home;