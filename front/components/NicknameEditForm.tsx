import { useMemo, useCallback } from "react";
import { Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { rootType } from "../reducers";
import useInput from "../hooks/useInput";
import { CHANGE_NICKNAME_REQUEST } from "../reducers/user";

const NicknameEditForm = () => {
  const { me } = useSelector((state: rootType) => state.user);
  const [nickname, onChangeNickname] = useInput(me.nickname || "");
  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    });
  }, [nickname]);

  const style = useMemo(
    () => ({
      marginBottom: "20px",
      border: "1px solid #d9d9d9",
      padding: "20px",
    }),
    [],
  );

  return (
    <Form style={style}>
      <Input.Search
        onSearch={onSubmit}
        addonBefore="닉네임"
        enterButton="수정"
        value={nickname}
        onChange={onChangeNickname}
      />
    </Form>
  );
};

export default NicknameEditForm;
