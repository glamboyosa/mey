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
    authorization: " bearer authentication-token",
    xpth: "xsssf",
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

## Global Config

`Mey` ships with a provider called `MeyProvider` that you would wrap around `<App/>` or `<Component/>` in your root, entry point of your project as the case may be.
`MeyProvider` accepts a single prop `BaseURL` that is the primary URL you would be making calls to. the point is to eliminate typing the same base path in every component that uses a hook. you'd simply now pass the path you're trying to hit e.g "/posts" which would translate to "https://yourbasepath.com/posts"

## Global Config Example

```tsx
import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MeyProvider } from "mey";
ReactDOM.render(
  <MeyProvider BaseURL="https://yourbasepath.com">
    <App />
  </MeyProvider>,
  document.getElementById("root")
);
```

## Extended useMutation Usage

```tsx
import  {useMutation}  from "mey";

const { data, loading, error, handleRequest } = useMutation(
  "https://jsonplaceholder.typicode.com/posts", "post", {
    authorization: " bearer authentication-token",
    xpth: "xsssf",
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
const { data, loading, error, refetch } = useFetch(url, headers);
```

### Parameters

- url: the URL path you want to fetch.
- headers: (optional) an object representing the values you want to set on the request header.

### Values

- data: data for the given path.
- loading: a boolean representing whether the request is loading or not.
- error: a string representing a potential error thrown.
- refetch: a function that refetches data.

## useMutation API

```tsx
const { data, loading, error, handleRequest } = useMey(
  url,
  requestType,
  headers
);
```

### Parameters

- url: the URL path you want to fetch.
- requestType: a union of string types representing the type of mutation you want to carry out i.e put, post & delete.
- headers: (optional) an object representing the values you want to set on the request header.

### Values

- data: data for the given path.
- loading: a boolean representing whether the request is loading or not.
- error: a string representing a potential error thrown.
- handleRequest: a function that handles dispatching requests. it accepts a `body` value. if the `body` value is not an object it stops execution and prints an error message to the console.

## Support

Have a question ? send me an email @ ogbemudiatimothy@gmail.com or hit me up on [twitter](https://twitter.com/glamboyosa).
also feel free to checkout my [portfolio](https://timothyogbemudia.netlify.app) (i'm available for work 😊)

## License

MIT © [glamboyosa](https://github.com/glamboyosa)
