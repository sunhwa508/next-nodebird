# NodeBird π₯

## Nextλ₯Ό μ ννλ κΈ°μ€

κ²μμμ§μ μ¬μ© ν  κ²μΈμ§ μλμ§

## μλ²μ¬μ΄λ λ λλ§(Next) π

- μ ν΅μ μΈ SSR λ°©μ

  > λΈλΌμ°μ  -> νλ‘ νΈμλ² -> λ°±μλμλ² -> λ°μ΄ν°λ² μ΄μ€ -> λ°±μλμλ² -> νλ‘ νΈμλ² -> λΈλΌμ°μ 

- SPA λ°©μ(CSR)
  > λΈλΌμ°μ  <- νλ‘ νΈμλ² (νλ©΄ λ¨Όμ  κ·Έλ €μ€) (js,html μ λ¬, μμ§ λ‘λ©ν΄λ μλλ νμ΄μ§κΉμ§ λ€ μ λ¬ λ¨)
  > λΈλΌμ°μ  -> λ°±μλμλ² -> λ°μ΄ν°λ² μ΄μ€ -> λΈλΌμ°μ 

**κ²μμμ§μ μν λ¦¬μ‘νΈλ³΄μλ²**

1. νλ¦¬λ λ (κ²μμμ§μΌλλ§ λ°±μλμλ²μμ λ°μ΄ν°λ₯Ό λ°μ htmlμ μμ±ν΄μ λκ²¨μ€λ€)
2. μλ²μ¬μ΄λ λ λλ§ (μ²« λ°©λ¬Έλ§ μ ν΅μ μΈ λ°©μμΌλ‘, λ§ν¬ λλ μ κ²½μ° λ¦¬μ‘νΈλ°©μμΌλ‘)
3. μ½λ μ€νλ¦Ών
4. reactGo μ€ν μμ€ νμ© (λ¦¬μ‘νΈλ‘ μλ²μ¬μ΄λ λ λλ§μ νκ³  μΆμ λ (next μ¬μ© x))

## νλ‘μ νΈ μΈν

```
npm init
npm i next @types/node @types/react

root/page/index.tsx μμ±

// build λͺλ Ήμ΄λ μ μ
"script":{ "build" : "next build" }
```

## eslint μ€μ  (μ½λλ£°μ μ ν΄ μ€λ₯λ©μμ§λ₯Ό λμμ€)

```
// κ°λ°μ©μΌλ‘ install
npm i eslint -D eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks

.eslintrc μμ±
{
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2021,
        // import, export => module ννμ΄λ€
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

## CORS λΈλΌμ°μ 

μλ²μ¬μ΄λ λ λλ§μ κ²½μ°μλ λ°±μλκ° μμ²­μ CORS μ€μ μ΄ νμν©λλ€
νλ‘ νΈ μλ²μ λ°±μλ μλ²κ°μ λλ©μΈ(ν¬νΈ)μ΄ λ€λ₯΄κΈ° λλ¬Έμ
νλ‘ νΈμμ  μΏ ν€λ³΄λ΄λκ² ex)withcredentials cookies μ€μ μ΄ νμν©λλ€.

## λ¦¬λμ€ thunk , saga

thunk : μ§μ° μν€λ€λ μλ―Έλ₯Ό κ°μ§κ³  μλ€.
action create ν¨μλ₯Ό λΉλκΈ°λ‘ μ¬μ© ν  μ μκ² ν΄μ€λ€.
νλ²μ dispatch λ₯Ό μ¬λ¬λ² ν  μ μκ² ν΄μ€λ€.

```javascript
const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

export const loginAction = (data) => {
  return (dispatch, getState) => {
    // initial state
    const state = getState();
    dispatch(loginRequestAction());
    axios
      .post('/api/login')
      .then((res) => {
        dispatch(loginSuccessAction(res.data));
      })
      .catch((err) => {
        dispatch(loginFailureAction(err));
      });
  };
};

// action creator
export const loginRequestAction = (data: { id: string, password: string }) => {
  return {
    type: 'LOG_IN_REQUEST',
    data,
  };
};

export const loginSuccessAction = (data: { id: string, password: string }) => {
  return {
    type: 'LOG_IN_SUCCESS',
    data,
  };
};

export const loginFailureAction = (data: { id: string, password: string }) => {
  return {
    type: 'LOG_IN_FAILURE',
    data,
  };
};
```

> λ―Έλ€μ¨μ΄ thunk λ§λ³΄κΈ°

```javascript
interface Props {
    dispatch: Dispatch;
    getState: () => TState;
}
//console μ μ°μ΄μ£Όλ λ―Έλ€μ¨μ΄λ₯Ό μλμ κ°μ΄ λ§λ€ μλ μλ€.
const loggerMiddleware = ({ dispatch, getState }: Props) => (next: any) => (action: AnyAction) => {
    console.log(action);
    return next(action)
}

const configureStore = () => {
    const middlewares:
        [ThunkMiddleware<{}, AnyAction, undefined> & { withExtraArgument<E>(extraArgument: E): ThunkMiddleware<{}, AnyAction, E>; }, ({ dispatch, getState }: Props) => (next: any) => (action: AnyAction) => any]
        = [thunkMiddleware, loggerMiddleware];
    // composeWithDevTools -> μ‘μνμ€ν λ¦¬κ° μμ΄λ©΄ μ±λ₯μ λ¬Έμ κ° λ¨μΌλ‘ κ°λ°μ©μΌλλ§ λμ νκ² νλ€.
    const enhancer = process.env.NODE_ENV === 'production'
        ? compose(applyMiddleware(...middlewares))
        : composeWithDevTools(applyMiddleware(...middlewares))
    const store = createStore(reducer, enhancer);
    return store
}
```

> Thunk μ Saga μ μ°¨μ΄μ 
> Thunkκ° λΉλκΈ°λ₯Ό κ°λ₯νκ² ν΄μ€λ€κ³  νλ©΄ Sagaλ κ·Έ μΈμλ delay(setTimeout)κΈ°λ₯,
> debounced (take latest) ν΄λ¦­μ΄ μ¬λ¬λ² λ€μ΄μμλ κ°μ₯ μ΅μ κ²λ§ μΈμνκ² νλ€.
> μ€ν¬λ‘€ μ΄λ²€νΈ => μ€ν¬λ‘€ ν λλ§λ€ μμ²­μ λ³΄λ΄λκ² μλ μ΅μ κ²λ§ λμνκ² ν¨. (μν λλμ€ λ°©μ§)

νλ§λλ‘ sagaκ° thunk λ³΄λ€ λ λ§μ κΈ°λ₯μ μ§μ, κΈ΄λ¨ν μ±μμλ thunk λ₯Ό μ¬μ©νλ λ³΅μ‘νκ³  ν° νλ‘μ νΈμμλ saga λ₯Ό μ¬μ©νμ! β­οΈ

**λλμ€**

κΈ°λ³Έ λ°μ΄ν° λ¦¬νλ μ μ£ΌκΈ°μ μλ²μ μ₯μ μ μ¬μλ μ£ΌκΈ°κ° κ³ μ λ κ°μ κ°λ κ²½μ° λμ΄ κ²ΉμΉλ μν©μμ νΈλν½μ΄ λ°°κ° λμ΄ μ± μ€μ€λ‘ μμ μ μλΉμ€μ DDoS κ³΅κ²©κ³Ό μ μ¬ν μν©μ μΌκΈ°νκ³  μ΄λ¬ν μ’μ§μμ μ£ΌκΈ°κ° λ°λ³΅λλ λ¬Έμ 

> λ―Έλ€μ¨μ΄ saga λ§λ³΄κΈ°
> generator μ yield κ° μλμ μμ λ©μΆλ€.
> μ€λ¨νκ³  μΆμ μ μ yieldλ₯Ό λ£κ³  {done:true} κ° λ λκΉμ§ next() λ₯Ό μ΄μ©ν΄ νΈμΆ ν  μ μλ€.

```javascript
const gen = function* () {
    console.log(1)
    yield;
    console.log(2)
    yield;
    console.log(3)
    yield 4;
}

> const generator = gen();
> generator // {<suspanded>}
> generator.next() //1 {value:undefined, done: false}
> generator.next() //2 {value:undefined, done: false}
> generator.next() //3 {value:undefined, done: false}
> generator.next() // {value:undefined, done: true}
// yield: await μ΄λ λΉμ·ν μ­ν μ ν  μ μλ€κ³  μκ°ν  μ μλ€.
```

μ λλ©μΆμ§ μλ generator

```javascript
const gen = function* () {
  while (true) {
    yield 'λ¬΄ν';
  }
};

//κΈ°μ‘΄ν¨μμμ  λ¬΄νλ°λ³΅ λ  μμλ λ‘μ§μ΄μ§λ§ generator μμ  yield μμ μ μ μ€λ¨λλ€.
```

## call vs fork

>fork vs call μ°¨μ΄μ  <br/>
>fork : λΉλκΈ° ν¨μ νΈμΆ <br/>
>call : λκΈ° ν¨μ νΈμΆ <br/>
>λλ€ generator ν¨μλ₯Ό λΆλ¬μ€λ κΈ°λ₯μ νκΈ°λ νλ
>fork λ non-blocking call μ blocking

```javascript
function* main() {
  yield fork(someSaga); // κΈ°λ€λ¦¬μ§ μκ³  λ°λ‘ λ€μ μ½λλ‘ λμ΄κ°λ€.
  console.log('this wont wait for the completion of someSaga');
}

function* main() {
  yield call(someSaga); //μ΄κ°μ λ°μ ν λ€μ μ½λλ‘ λμ΄κ°λ€.
  console.log('this will wait for the completion of someSaga');
}
```

## keyκ° μ ν λ μ μ©ν λΌμ΄λΈλ¬λ¦¬

1. shortid

   > shortid.generate() => κ²ΉμΉκΈ° νλ  μμ΄λλ₯Ό μμ±ν΄μ€λ€.

   ```javascript
   const dummyPost = (data: string) => ({
     id: shortId.generate(),
     content: data,
     User: {
       id: 1,
       nickname: 'μ λ‘μ΄',
     },
     Images: [
       {
         src: '',
       },
     ],
     Comments: [],
   });
   ```

2. faker
   > κ°μ’ λλ―Έλ°μ΄ν°λ₯Ό μμ±ν΄μ€λ€. (email, userName...)

## bugs ν΄κ²°

![image](https://user-images.githubusercontent.com/61695175/126586343-bfc242f4-b038-4f78-9b52-392a66d9de4c.png)

```
typescriptλ₯Ό μ¬μ©νλ κ²½μ° useRefμ μ΄κΈ°κ° μ€μ μ΄ λμ΄ μμ§ μμΌλ©΄ λ€μκ³Ό κ°μ μλ¬κ° λ°μνλ€.
const imageInput = useRef<HTMLInputElement>(null);
```
