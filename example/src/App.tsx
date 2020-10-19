import React from "react";
import { useMutation, useFetch } from "mey";
const App = () => {
  const { data, loading, error, refetch } = useFetch(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const {
    data: mutationData,
    error: mutationError,
    loading: mutationLoading,
    handleRequest,
  } = useMutation("https://jsonplaceholder.typicode.com/posts", "post", {
    headerName: "Authorization",
    headerValue: "authentication-token",
  });
  const submitHandler = () => {
    const randomNumber = Math.random() * 100;
    const body = {
      randomNumber,
    };
    handleRequest(body);
  };
  if (!data && loading) {
    return <div> loading </div>;
  }
  if (error) {
    return <div> {error} </div>;
  }
  return (
    <div>
      {data.map((el: any) => el.title)[0]}
      <p>
        {" "}
        generate a new random number:{" "}
        {mutationData && !mutationError
          ? mutationData.id
          : "mutationError"}{" "}
      </p>
      <button disabled={mutationLoading} onClick={submitHandler}>
        {" "}
        click me{" "}
      </button>
      <button disabled={loading} onClick={refetch}>
        refetch data
      </button>
    </div>
  );
};

export default App;
