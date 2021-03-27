import React from "react";
import { useMutation, useFetch } from "mey";
const App = () => {
  // {body: string; userId: number; id: number; title: string;}[]
  const { data, loading, error, refetch } = useFetch<
    { body: string; userId: number; id: number; title: string }[]
  >("https://jsonplaceholder.typicode.com/posts");
  console.log(data);
  const {
    data: mutationData,
    error: mutationError,
    loading: mutationLoading,
    handleRequest,
  } = useMutation("https://jsonplaceholder.typicode.com/posts", "delete", {
    authorization: " bearer sfsfsfsf",
    xpth: "xsssf",
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
      {data.map((el) => el.title)[0]}
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
