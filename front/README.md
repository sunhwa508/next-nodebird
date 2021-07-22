# NodeBird 🐥

## Next를 선택하는 기준 
검색엔진을 사용 할 것인지 아닌지..!

## 서버사이드 렌더링(Next) 🎃
* 전통적인 SSR 방식
> 브라우저 -> 프론트서버 -> 백엔드서버 -> 데이터베이스 -> 백엔드서버 -> 프론트서버 -> 브라우저 

* SPA 방식(CSR)
> 브라우저 <- 프론트서버 (화면 먼저 그려줌) (js,html 전달, 아직 로딩해도 안되는 페이지까지 다 전달 됨)
> 브라우저 -> 백엔드서버 -> 데이터베이스 -> 브라우저

**검색엔진을 위한 리액트보완법**
1. 프리렌더(검색엔진일때만 백엔드서버에서 데이터를 받아 html을 완성해서 넘겨준다)
2. 서버사이드 렌더링 (첫 방문만 전통적인 방식으로, 링크 눌렀을 경우 리액트방식으로)
3. 코드 스플릿팅
4. reactGo 오픈 소스 활용 (리액트로 서버사이드 렌더링을 하고 싶을 때 (next 사용 x))

## 프로젝트 세팅
```
npm init
npm i next @types/node @types/react

root/page/index.tsx 생성

// build 명령어는 정의
"script":{ "build" : "next build" }
```

## eslint 설정 (코드룰을 정해 오류메시지를 띄워줌)
```
// 개발용으로 install
npm i eslint -D eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks

.eslintrc 생성
{
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2021,
        // import, export => module 형태이다
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
            "tsx": true
        }
    },
    "env":{
        "browser": true,
        "node": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "plugins": [
        "import",
        "react-hooks"
    ]
}

```

## CORS 브라우저 - 
서버사이드 렌더링의 경우에도 백엔드간 요청에 CORS 설정이 필요합니다
프론트 서버와 백엔드 서버간의 도메인(포트)이 다르기 때문에 
프론트에선 쿠키보내는것 ex)withcredentials cookies 설정이 필요합니다. 

## 리덕스 thunk , saga
thunk : 지연 시키다는 의미를 가지고 있다.
action create 함수를 비동기로 사용 할 수 있게 해준다.
한번에 dispatch 를 여러번 할 수 있게 해준다. 

```javascript
const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

export const loginAction = (data) =>{
    return(dispatch, getState) =>{
        // initial state
        const state = getState();
        dispatch(loginRequestAction());
        axios.post('/api/login')
        .then((res)=>{
            dispatch(loginSuccessAction(res.data));
        })
        .catch((err)=>{
            dispatch(loginFailureAction(err));
        })
    }
}

// action creator
export const loginRequestAction = (data: { id: string, password: string }) => {
    return {
        type: 'LOG_IN_REQUEST',
        data,
    }
}

export const loginSuccessAction = (data: { id: string, password: string }) => {
    return {
        type: 'LOG_IN_SUCCESS',
        data,
    }
}

export const loginFailureAction = (data: { id: string, password: string }) => {
    return {
        type: 'LOG_IN_FAILURE',
        data,
    }
}
```

> 미들웨어 thunk 맛보기 

```javascript 
interface Props {
    dispatch: Dispatch;
    getState: () => TState;
}
//console 을 찍어주는 미들웨어를 아래와 같이 만들 수도 있다. 
const loggerMiddleware = ({ dispatch, getState }: Props) => (next: any) => (action: AnyAction) => {
    console.log(action);
    return next(action)
}

const configureStore = () => {
    const middlewares:
        [ThunkMiddleware<{}, AnyAction, undefined> & { withExtraArgument<E>(extraArgument: E): ThunkMiddleware<{}, AnyAction, E>; }, ({ dispatch, getState }: Props) => (next: any) => (action: AnyAction) => any]
        = [thunkMiddleware, loggerMiddleware];
    // composeWithDevTools -> 액션히스토리가 쌓이면 성능에 문제가 됨으로 개발용일때만 동작 하게 한다.
    const enhancer = process.env.NODE_ENV === 'production'
        ? compose(applyMiddleware(...middlewares))
        : composeWithDevTools(applyMiddleware(...middlewares))
    const store = createStore(reducer, enhancer);
    return store
}
```

> Thunk 와 Saga 의 차이점
Thunk가 비동기를 가능하게 해준다고 하면 Saga는 그 외에도 delay(setTimeout)기능,
debounced (take latest) 클릭이 여러번 들어왔을때 가장 최신것만 인식하게 한다.
스크롤 이벤트 => 스크롤 할때마다 요청을 보내는게 아닌 최신것만 동작하게 함. (셀프 디도스 방지)

한마디로 saga가 thunk 보다 더 많은 기능을 지원, 긴단한 앱에서는 thunk 를 사용하되 복잡하고 큰 프로젝트에서는 saga 를 사용하자! ⭐️

**디도스**

기본 데이터 리프레시 주기와 서버의 장애시 재시도 주기가 고정된 값을 갖는 경우 둘이 겹치는 상황에서 트래픽이 배가 되어 앱 스스로 자신의 서비스에 DDoS 공격과 유사한 상황을 야기하고 이러한 좋지않은 주기가 반복되는 문제
