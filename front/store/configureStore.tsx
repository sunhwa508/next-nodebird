import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore, AnyAction, Dispatch } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../reducers/index';
import createSagaMiddleware from 'redux-saga';

import rootSaga from '../sagas';
import { SagaStore } from './redux';

interface Props {
  dispatch: Dispatch;
  getState: () => {};
}
//console 을 찍어주는 미들웨어를 아래와 같이 만들 수도 있다.
const loggerMiddleware =
  ({ dispatch, getState }: Props) =>
  (next: any) =>
  (action: AnyAction) => {
    return next(action);
  };

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares: any = [sagaMiddleware, loggerMiddleware];
  // composeWithDevTools -> 액션히스토리가 쌓이면 성능에 문제가 됨으로 개발용일때만 동작 하게 한다.
  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
