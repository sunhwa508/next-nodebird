import { List, Card, Button } from 'antd'
import { StopOutlined } from '@ant-design/icons'

interface IData {
    nickname: String
};

interface Props {
    header: String,
    data: IData[],
}
const FollowList = ({ header, data }: Props) => {
    return (
        <List style={{ marginBottom: 20 }}
            grid={{ gutter: 4, xs: 2, md: 2 }}
            size="small"
            header={<div>{header}</div>}
            loadMore={<div style={{ textAlign: 'center', margin: '10px 0' }}><Button>더 보기</Button></div>}
            bordered
            dataSource={data}
            renderItem={(item) => (
                <List.Item style={{ marginTop: 20 }}>
                    <Card actions={[<StopOutlined key="stop" />]}>
                        <Card.Meta description={item.nickname} />
                    </Card>
                </List.Item>
            )}
        />
    );
}

export default FollowList