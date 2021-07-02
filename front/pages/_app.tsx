import 'antd/dist/antd.css'
import Head from 'next/head'
interface props {
    Component: React.ElementType
}
// index.tsx 의 부모 
const NodeBird = ({ Component }: props) => {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>NodeBird</title>
            </Head>
            <Component />
        </>
    )
}
export default NodeBird