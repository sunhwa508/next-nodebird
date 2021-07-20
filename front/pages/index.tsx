import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout'
import { rootType } from '../reducers'
import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'

const Home = () => {
    const { isLoggedIn } = useSelector((state: rootType) => state.user);
    const { mainPosts } = useSelector((state: rootType) => state.post);

    return (
        <AppLayout>
            {isLoggedIn && <PostForm />}
            {mainPosts.map((post: any) => <PostCard key={post.id} post={post} />)}
        </AppLayout>
    )
}

export default Home;