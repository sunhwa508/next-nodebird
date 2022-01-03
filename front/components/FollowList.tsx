import { List, Card, Button } from "antd";
import { StopOutlined } from "@ant-design/icons";
import { UN_FOLLOW_REQUEST } from "../reducers/user";
import { useDispatch } from "react-redux";
interface IData {
  id: number;
  nickname: String;
}
interface Props {
  header: String;
  data: IData[];
  loading: boolean;
  onClickMore: () => void;
}
const FollowList = ({ header, data, loading, onClickMore }: Props) => {
  console.log("Data", data);
  const dispatch = useDispatch();

  const onCancel = (id: number) => () => {
    dispatch({
      type: UN_FOLLOW_REQUEST,
      data: id,
    });
  };

  return (
    <List
      style={{ marginBottom: 20 }}
      grid={{ gutter: 4, xs: 2, md: 2 }}
      size="small"
      header={<div>{header}</div>}
      loadMore={
        <div style={{ textAlign: "center", margin: "10px 0" }}>
          <Button onClick={onClickMore} loading={loading}>
            더 보기
          </Button>
        </div>
      }
      bordered
      dataSource={data}
      renderItem={item => (
        <List.Item style={{ marginTop: 20 }}>
          <Card actions={[<StopOutlined key="stop" onClick={onCancel(item.id)} />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
};

export default FollowList;
