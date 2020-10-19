# mey

> A react package that exports hooks for handling the request lifecycle

[![NPM](https://img.shields.io/npm/v/mey.svg)](https://www.npmjs.com/package/mey) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Motivation

This package was created for people who don't want to go through the chore of handling the request lifecycle but don't want to reach for a big data fetching library. A lot of people do not need the complexity of a big library, the project's aren't complex enough to warrant such overhead but equally are tired of handling the request lifecycle and the questions that come with it such as:

- "should i use `useReducer` or `useState` ?"
- "do i have different slices of state or a state object? which is cleaner?"
  This package aims to take all that pain away and exports two hooks to handle it all `useFetch` and `useMutation`

## Install

```bash
npm install --save mey
```

```bash
yarn add mey
```

it is written in TypeScript so no need to install types.

## useFetch Usage

```tsx
import { useFetch } from "mey";

const { data, loading, error, refetch } = useFetch(
  "https://jsonplaceholder.typicode.com/posts"
);
console.log("the data is:");
console.log(data);
if (!data && loading) {
  return <div> loading </div>;
}
if (error) {
  return <div> {error} </div>;
}
return <div>{data.map((el: any) => el.title)[0]}</div>;
```

## Extended useFetch Usage

```tsx
import { useFetch } from "mey";

const { data, loading, error, refetch } = useFetch(
  "https://jsonplaceholder.typicode.com/posts",
  {
    headerName: "Authorization",
    headerValue: "authentication-token",
  }
);
if (!data && loading) {
  return <div> loading </div>;
}
if (error) {
  return <div> {error} </div>;
}
return <div>{data.map((el: any) => el.title)[0]}</div>;
```

## useMutation Usage

```tsx
import  {useMutation}  from "mey";

const { data, loading, error, handleRequest } = useMutation(
  "https://jsonplaceholder.typicode.com/posts", "post"
);
const submitHandler = () => {
const randomNumber = Math.random() * 100;
const body = {
  randomNumber
}
handleRequest(body);
};
return (
  <div>
  <p> generate a new random number: {data && !error ? data : error } </p>
  <button disabled={loading} onClick={submitHandler}> click me </button>
)

```

## Extended useMutation Usage

```tsx
import  {useMutation}  from "mey";

const { data, loading, error, handleRequest } = useMutation(
  "https://jsonplaceholder.typicode.com/posts", "post", {
    headerName: "Authorization",
    headerValue: "authentication-token"
  }
);
const submitHandler = () => {
const randomNumber = Math.random() * 100;
const body = {
  randomNumber
}
handleRequest(body);
};
return (
  <div>
  <p> generate a new random number: {data && !error ? data : error } </p>
  <button disabled={loading} onClick={submitHandler}> click me </button>
)

```

## useFetch API

```tsx
const { data, loading, error, refetch } = useFetch(url, authHeaderValues);
```

### Parameters

- url: the URL path you want to fetch
- authHeaderValues: (optional) an object containing two properties: `headerName` and `headerValue` used to add an authentication header.

### Values

- data: data for the given path
- loading: a boolean representing whether the request is loading or not
- error: a string representing a potential error thrown
- refetch: a function that refetches data

## useMutation API

```tsx
const { data, loading, error, handleRequest } = useMey(
  url,
  requestType,
  authHeaderValues
);
```

### Parameters

- url: the URL path you want to fetch
- requestType: a union of string types representing the type of mutation you want to carry out i.e put, post & delete
- authHeaderValues: (optional) an object containing two properties: `headerName` and `headerValue` used to add an authentication header.

### Values

- data: data for the given path
- loading: a boolean representing whether the request is loading or not
- error: a string representing a potential error thrown
- handleRequest: a function that handles dispatching requests. it accepts a `body` value. if the `body` value is not an object it stops execution and prints an error message to the console.

## Support

Have a question ? send me an email @ ogbemudiatimothy@gmail.com or hit me up on [twitter](https://twitter.com/glamboyosa).
also feel free to checkout my [portfolio](https://timothyogbemudia.netlify.app) (i'm available for work 😊)

## License

MIT © [glamboyosa](https://github.com/glamboyosa)