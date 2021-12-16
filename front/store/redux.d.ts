import 'redux';
import { Task } from 'redux-saga';

declare module 'redux' {
  export interface Store {
    sagaTask?: Task;
  }
}

export interface SagaStore extends Store<State, AnyAction> {
  sagaTask: Task;
}